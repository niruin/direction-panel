import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Withdraws} from './models/withdraws.model';
import {WithdrawsAllResponse} from './interfaces/withdraws.interface';
import {ExecuteWithdrawsDto, IExecuteWithdrawsDto, IUpdateStatusWithdrawsDto} from './dto/execute-withdraws.dto';
import {Response} from '../interfaces/interface'

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Withdraws)
    private readonly withdrawsModel: typeof Withdraws
  ) {
  }

  async findAll(): Promise<WithdrawsAllResponse> {
    const response = await this.withdrawsModel.findAll().catch((error) => {
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
      data: response
    }
  }

  async execute(executeWithdrawsDto: IExecuteWithdrawsDto): Promise<Response> {
    const response = await this.withdrawsModel.update({...executeWithdrawsDto},
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

    return {
      status: 'success',
      message: ['Данные обновлены'],
      statusCode: HttpStatus.OK,
    }
  }

  async updateStatus(executeWithdrawsDto: IUpdateStatusWithdrawsDto): Promise<Response> {
    const response = await this.withdrawsModel.update({...executeWithdrawsDto},
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

    return {
      status: 'success',
      message: ['Данные Обновлены'],
      statusCode: HttpStatus.OK,
    }
  }
}