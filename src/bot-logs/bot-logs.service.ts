import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {BotLogEvent, CreateBotLogDto} from './dto/create-bot-log.dto';
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

  async findAll(page: number, size: number, logEvent: BotLogEvent): Promise<BotLogsAllResponse> {
    const response = await this.botLogModel.findAndCountAll(
      {
        offset: (page - 1) * size,
        limit: size,
        order: [
          ['id', 'DESC'],
        ],
        raw: true,
        where: {
          ...(logEvent && {event: logEvent})
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
      data: response.rows,
      totalCount: response.count,
    }
  }
}
