import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {WithdrawLog} from './models/withdraw-log.model';
import {WithdrawLogsResponseData} from './interfaces/withdraw-logs.interface';
import {CreateWithdrawLogDto} from './dto/create-withdraw-log.dto';
import {Response} from '../interfaces/interface';

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

  async findAll(withdrawId?: string): Promise<WithdrawLogsResponseData[]> {
    let options = {};
    if(withdrawId) {
      options = {...options,  where: {
          withdrawId: Number(withdrawId),
        },}
    }

    const response = await this.withdrawLogModel.findAll({...options, raw: true}).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Не удалось загрузить данные'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    return response.sort((a,b) => b.id - a.id)
  }
}