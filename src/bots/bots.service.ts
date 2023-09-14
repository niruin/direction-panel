import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Response} from '../interfaces/interface'
import {Bot} from './models/bot.model';
import {BotsAllResponse} from './interfaces/bots.interface';
import {UpdateBotDto} from './dto/update-bot.dto';
import {CreateBotDto} from './dto/create-bot.dto';

@Injectable()
export class BotsService {
  constructor(
    @InjectModel(Bot)
    private readonly botsModel: typeof Bot
  ) {
  }

  async findAll(): Promise<BotsAllResponse> {
    const response = await this.botsModel.findAll({raw: true}).catch((error) => {
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

  async update(updateBotDto: UpdateBotDto): Promise<Response> {
    const response = await this.botsModel.update({...updateBotDto},
      {
        where: {
          id: updateBotDto.id,
        },
      }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Данные не сохранены'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    const effectedCount = response[0];
    const msg = Boolean(effectedCount) ? 'Изменения сохранены' : 'Данные не изменены';

    return {
      status: 'success',
      message: [msg],
      statusCode: HttpStatus.OK,
    }
  }

  async create(createBotDto: CreateBotDto): Promise<Response> {
    const response = await this.botsModel.create({...createBotDto});

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена']
    }
  }
}