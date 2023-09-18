import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Response} from '../interfaces/interface'
import {Bot} from './models/bot.model';
import {BotsAllResponse} from './interfaces/bots.interface';
import {UpdateBotDto} from './dto/update-bot.dto';
import {CreateBotDto} from './dto/create-bot.dto';
import {Partner} from '../partners/models/partner.model';
import {IssueBotDto} from './dto/issue-bot.dto';
import {BotLogsService} from '../bot-logs/bot-logs.service';
import {CreateBotLogDto} from '../bot-logs/dto/create-bot-log.dto';

const Op = require('sequelize').Op;

@Injectable()
export class BotsService {
  constructor(
    @InjectModel(Bot)
    private readonly botsModel: typeof Bot,
    private readonly botLog: BotLogsService,
  ) {
  }

  findOne(id: string): Promise<Bot> {
    return this.botsModel.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(status: 'active' | 'issued'): Promise<BotsAllResponse> {
    const options = status === 'issued' ? {where: {partnerId: {[Op.ne]: null}}} : {
      where: {
        partnerId: null
      },
    }
    const response = await this.botsModel.findAll({
      ...options,
      raw: true,
      include: [
        {
          model: Partner,
          attributes: ['partnerName'],
        }
      ]
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
      data: response.sort((a, b) => b.id - a.id).map(item => ({
        ...item,
        partnerName: item.partner?.partnerName,
      }))
    }
  }

  async update(updateBotDto: UpdateBotDto): Promise<Response> {
    if(updateBotDto.partnerId) {
      this.issue(updateBotDto, 'employer')
    }
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

    const logData: CreateBotLogDto = {
      botName: updateBotDto.botName,
      event: 'Изменен',
      // partnerId: updateBotDto.partnerId,
    }

    await this.botLog.create(logData)

    const effectedCount = response[0];
    const msg = Boolean(effectedCount) ? 'Изменения сохранены' : 'Данные не изменены';

    return {
      status: 'success',
      message: [msg],
      statusCode: HttpStatus.OK,
    }
  }

  async create(createBotDto: CreateBotDto, username: string): Promise<Response> {
    console.log(username);
    const response = await this.botsModel.create({...createBotDto, employee: username});

    const logData: CreateBotLogDto = {
      botName: createBotDto.botName,
      event: 'Добавлен'
    }

    await this.botLog.create(logData)

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена']
    }
  }

  async remove(id: string, username: string): Promise<Response> {
    const bot = await this.findOne(id);

    if (!bot) {
      throw new BadRequestException({
        status: 'error',
        message: ['Элемент не удален'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: `Элемент с идентификатором '${id}' не найден`,
      })
    }

    await bot.destroy();

    const logData: CreateBotLogDto = {
      botName: bot.botName,
      event: 'Удален',
      partnerId: bot.partnerId,
    }

    await this.botLog.create(logData)

    return {
      status: 'success',
      message: ['Элемент удален'],
      statusCode: HttpStatus.OK
    }
  }

  async issue(issueBotDto: IssueBotDto, username: string): Promise<Response> {
    const {id, ...restData} = issueBotDto;
    const data = {
      ...restData,
      partnerId: issueBotDto.partnerId
    };

    const response = await this.botsModel.update({...data},
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

    const logData: CreateBotLogDto = {
      botName: issueBotDto.botName,
      event: 'Выдан',
      partnerId: issueBotDto.partnerId,
    }

    await this.botLog.create(logData)


    return {
      status: 'success',
      message: ['Данные обновлены'],
      statusCode: HttpStatus.OK,
    }
  }
}