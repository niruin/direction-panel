import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {EnumCancelReason, EnumStatus, Withdraws} from './models/withdraws.model';
import {WithdrawsAllResponse} from './interfaces/withdraws.interface';
import {IExecuteWithdrawsDto, IUpdateStatusWithdrawsDto} from './dto/execute-withdraws.dto';
import {Response} from '../interfaces/interface'
import {WithdrawLogsService} from '../withdraw-logs/withdraw-logs.service';
import {CreateWithdrawLogDto} from '../withdraw-logs/dto/create-withdraw-log.dto';

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Withdraws)
    private readonly withdrawsModel: typeof Withdraws,
    private readonly withdrawLogsService: WithdrawLogsService
  ) {
  }

  async findAll(): Promise<WithdrawsAllResponse> {
    const response = await this.withdrawsModel.findAll({raw: true}).catch((error) => {
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
      data: response.sort((a,b) => b.id - a.id)
    }
  }

  async execute(executeWithdrawsDto: IExecuteWithdrawsDto): Promise<Response> {
    const {id, ...restData} = executeWithdrawsDto;
    const data = {
      ...restData,
      status: EnumStatus.send,
      sendTime: new Date(),
    };

    const response = await this.withdrawsModel.update({...data},
      {
        where: {
          id: id,
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
      withdrawId: id,
      event: EnumStatus.send,
      employee: '',
      other: ''
    }
    this.withdrawLogsService.create(logData)

    return {
      status: 'success',
      message: ['Данные обновлены'],
      statusCode: HttpStatus.OK,
    }
  }

  async updateStatus(executeWithdrawsDto: IUpdateStatusWithdrawsDto): Promise<Response> {
    const cancelReason = executeWithdrawsDto.status === EnumStatus.canceled ? EnumCancelReason.operator : null;
    const {id, ...rest} = executeWithdrawsDto;
    const response = await this.withdrawsModel.update({...rest, cancelReason},
      {
        where: {
          id: executeWithdrawsDto.id,
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
      withdrawId: id,
      event: executeWithdrawsDto.status,
      employee: '',
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