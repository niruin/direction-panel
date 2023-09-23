import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {EnumCancelReason, EnumStatus, Withdraw} from './models/withdraws.model';
import {WithdrawsAllResponse} from './interfaces/withdraws.interface';
import {IExecuteWithdrawsDto, IUpdateStatusWithdrawsDto} from './dto/execute-withdraws.dto';
import {Response} from '../interfaces/interface'
import {WithdrawLogsService} from '../withdraw-logs/withdraw-logs.service';
import {CreateWithdrawLogDto} from '../withdraw-logs/dto/create-withdraw-log.dto';
import {Partner} from '../partners/models/partner.model';

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Withdraw)
    private readonly withdrawsModel: typeof Withdraw,
    private readonly withdrawLogsService: WithdrawLogsService
  ) {
  }

  async findAll(): Promise<WithdrawsAllResponse> {
    const options = {
      include: [
        {
          model: Partner,
          attributes: ['partnerName'],
        }
      ],
      raw: true,
    }
    const response = await this.withdrawsModel.findAll(options).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Не удалось загрузить данные'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    return {
      status: 'success',
      message: ['Данные получены'],
      statusCode: HttpStatus.OK,
      data: response.sort((a, b) => b.id - a.id).map((item) => (
        {
          ...item,
          partnerName: item['partner.partnerName']
        }
      ))
    }
  }

  async execute(executeWithdrawsDto: IExecuteWithdrawsDto, username: string): Promise<Response> {
    const {withdrawid, ...restData} = executeWithdrawsDto;
    const data = {
      ...restData,
      status: EnumStatus.send,
      sendTime: new Date(),
    };

    const response = await this.withdrawsModel.update({...data},
      {
        where: {
          withdrawid: withdrawid,
        },
      }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Данные не сохранены'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });


    const logData: CreateWithdrawLogDto = {
      date: new Date(),
      withdrawId: withdrawid,
      event: EnumStatus.send,
      employee: username,
      other: ''
    }
    this.withdrawLogsService.create(logData)

    return {
      status: 'success',
      message: ['Данные обновлены'],
      statusCode: HttpStatus.OK,
    }
  }

  async updateStatus(executeWithdrawsDto: IUpdateStatusWithdrawsDto, username: string): Promise<Response> {
    const cancelReason = executeWithdrawsDto.status === EnumStatus.canceled ? EnumCancelReason.operator : null;
    const {withdrawid, ...rest} = executeWithdrawsDto;
    const response = await this.withdrawsModel.update({...rest, cancelReason},
      {
        where: {
          withdrawid: executeWithdrawsDto.withdrawid,
        },
      }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Данные не сохранены'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    const logData: CreateWithdrawLogDto = {
      date: new Date(),
      withdrawId: withdrawid,
      event: executeWithdrawsDto.status,
      employee: username,
      other: ''
    }

    this.withdrawLogsService.create(logData)

    return {
      status: 'success',
      message: ['Данные Обновлены'],
      statusCode: HttpStatus.OK,
    }
  }
}