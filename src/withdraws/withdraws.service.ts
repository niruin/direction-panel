import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {EnumCancelReason, EnumStatus, Withdraw} from './models/withdraws.model';
import {WithdrawsAllResponse} from './interfaces/withdraws.interface';
import {IExecuteWithdrawsDto, IUpdateStatusWithdrawsDto} from './dto/execute-withdraws.dto';
import {Response} from '../interfaces/interface'
import {WithdrawLogsService} from '../withdraw-logs/withdraw-logs.service';
import {CreateWithdrawLogDto} from '../withdraw-logs/dto/create-withdraw-log.dto';
import {Partner} from '../partners/models/partner.model';
import {PartnersService} from '../partners/partners.service';

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Withdraw)
    private readonly withdrawsModel: typeof Withdraw,
    private readonly withdrawLogsService: WithdrawLogsService,
    private readonly partnersService: PartnersService
  ) {
  }

  async findAll(page: number, size: number,  partnerId: number | null, status: EnumStatus[]): Promise<WithdrawsAllResponse> {
    const response = await this.withdrawsModel.findAndCountAll({
      include: [
        {
          model: Partner,
          attributes: ['partnerName'],
        }
      ],
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['withdrawid', 'DESC'],
      ],
      raw: true,
      where: {
        ...(partnerId && {partnerId: partnerId}),
        ...(status && {status: status}),
      }
    }).catch((error) => {
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
      data: response.rows.map((item) => (
        {
          ...item,
          partnerName: item['partner.partnerName']
        }
      )),
      totalPages: response.count
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
    let cancelReason = null;
    const {withdrawid, status} = executeWithdrawsDto;

    if(executeWithdrawsDto.status === EnumStatus.canceled) {
      const withdraw = await this.withdrawsModel.findOne({where: { withdrawid }});

      //TODO протестировать и поправить
      if(withdraw.status === EnumStatus.canceled) {
        throw new BadRequestException({
          status: 'error',
          message: ['Данные не сохранены'],
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Заявка уже отменена",
        })
      }

      cancelReason = EnumCancelReason.operator;
    }

    await this.withdrawsModel.update({status, cancelReason},
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

    if(status === EnumStatus.canceled) {
      const withdraw = await this.withdrawsModel.findOne({where: { withdrawid }});
      const partner = await this.partnersService.findOne(String(withdraw.partnerId));
      const newFiatBalance = Number(partner.fiatBalance) + Number(withdraw.fiatamount);

      await this.partnersService.update({...partner, fiatBalance: newFiatBalance}, username, 'Изменен');
    }

    const logData: CreateWithdrawLogDto = {
      date: new Date(),
      withdrawId: withdrawid,
      event: executeWithdrawsDto.status,
      employee: username,
      other: ''
    }

    await this.withdrawLogsService.create(logData)

    return {
      status: 'success',
      message: ['Данные Обновлены'],
      statusCode: HttpStatus.OK,
    }
  }
}