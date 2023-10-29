import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {WithdrawLog} from './models/withdraw-log.model';
import {WithdrawLogsResponse, WithdrawLogsResponseData} from './interfaces/withdraw-logs.interface';
import {CreateWithdrawLogDto} from './dto/create-withdraw-log.dto';
import {Response} from '../_interfaces/interface';
import {EnumTariffPlan, Partner} from '../partners/models/partner.model';
import {EnumStatus} from '../withdraws/models/withdraws.model';
import {User} from '../users/models/users.model';

@Injectable()
export class WithdrawLogsService {
  constructor(
    @InjectModel(WithdrawLog)
    private readonly withdrawLogModel: typeof WithdrawLog,
  ) {
  }

  async create(data: CreateWithdrawLogDto): Promise<Response> {
    const response = await this.withdrawLogModel.create({...data});

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена']
    }
  }

  async findAll(page: number, size: number, withdrawId?: string, event?: EnumStatus[] | undefined): Promise<WithdrawLogsResponse> {
    const response = await this.withdrawLogModel.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['id', 'DESC'],
      ],
      raw: true,
      where: {
        ...(withdrawId && {withdrawId: Number(withdrawId)}),
        ...(event && {event: event})
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Не удалось загрузить данные'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    const data: WithdrawLogsResponseData[] = response.rows.map(item => {
      return {
        ...item,
        employee: item['employee.username']
      }
    })

    return {
      status: 'success',
      message: ['Данные получены'],
      statusCode: HttpStatus.OK,
      data: data,
      totalCount: response.count
    }
  }
}
