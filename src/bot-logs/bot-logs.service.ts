import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {CreateBotLogDto} from './dto/create-bot-log.dto';
import {BotLog} from './models/bot-logs.model';
import {Response} from '../interfaces/interface';
import {BotLogsAllResponse} from './interfaces/bot-logs';

@Injectable()
export class BotLogsService {
  constructor(
    @InjectModel(BotLog)
    private readonly botLogModel: typeof BotLog,
  ) {
  }

  async create(createBotLogDto: CreateBotLogDto): Promise<Response> {
    const response = await this.botLogModel.create({...createBotLogDto});

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена'],
    }
  }

  async findAll(): Promise<BotLogsAllResponse> {
    const response = await this.botLogModel.findAll({ raw: true}).catch((error) => {
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
}
