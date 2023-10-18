import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Cron, CronExpression} from '@nestjs/schedule';
import {HttpService} from '@nestjs/axios';

import {Response} from '../interfaces/interface'
import {Bot, EnumBotStatus} from './models/bot.model';
import {BotsAllResponse} from './interfaces/bots.interface';
import {UpdateBotDto} from './dto/update-bot.dto';
import {CreateBotDto} from './dto/create-bot.dto';
import {Partner} from '../partners/models/partner.model';
import {IssueBotDto} from './dto/issue-bot.dto';
import {BotLogsService} from '../bot-logs/bot-logs.service';
import {CreateBotLogDto} from '../bot-logs/dto/create-bot-log.dto';
import {SocksProxyAgent} from 'socks-proxy-agent';
import {ProxyService} from '../proxy/proxy.service';
import {firstValueFrom} from 'rxjs';
import {PartnersService} from '../partners/partners.service';

const Op = require('sequelize').Op;

@Injectable()
export class BotsService {
  constructor(
    @InjectModel(Bot)
    private readonly botsModel: typeof Bot,
    private readonly botLog: BotLogsService,
    private readonly httpService: HttpService,
    private readonly proxyService: ProxyService,
    private readonly partnersService: PartnersService
  ) {
  }

  findOne(id: string): Promise<Bot> {
    return this.botsModel.findOne({
      where: {
        id,
      },
    });
  }

  findOneByToken(token: string): Promise<Bot> {
    return this.botsModel.findOne({
      where: {
        token,
      },
    });
  }

  async findAllActive() {
    return await this.botsModel.findAll({where: {partnerId: null}, raw: true})
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async updateBots(): Promise<Response> {
    const botsList = await this.findAllActive();
    const proxyConfig = await this.proxyService.findOne('1');

    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    };

    try {
      botsList.map(async (bot, index) => {
        const url = `https://api.telegram.org/bot${bot.token}/getMe`;

        const {protocol, ip, port, requestDelayMs} = proxyConfig;
        const proxyOptions = `${protocol}://${ip}:${port}`;
        const httpsAgent = new SocksProxyAgent(proxyOptions);
        const promise = this.httpService.get(url, {
          httpsAgent: httpsAgent
        })

        const result = await firstValueFrom(promise)

        await delay(requestDelayMs * index);

        //@ts-ignore
        const status = result.data.ok ? EnumBotStatus.active : EnumBotStatus.blocked;

        const currentBot = await this.botsModel.findOne({where: {id: bot.id}});

        //Коррекция лимита
        const updateLimitsForPartner = async () => {
          const partner = await this.partnersService.findOne(String(currentBot.partnerID));
          if (partner.countBotLimit > 0) {
            this.partnersService.update({
              ...partner,
              countBotLimit: partner.countBotLimit - 1
            }, 'System', 'Коррекция лимита')
          }
        }

        // если поменялся статус с "active" на "blocked"
        if (currentBot.status === EnumBotStatus.active && !result.data.ok) {
          const newBotLog: CreateBotLogDto = {
            botName: currentBot.botName,
            event: 'Заблокирован',
            partnerId: currentBot.partnerID,
          }
          this.botLog.create(newBotLog)

          // если бот выдан партнеру"
          if (currentBot.partnerID) {
            updateLimitsForPartner();
          }
        }

        await this.botsModel.update({status, lastCheck: new Date()}, {where: {id: bot.id}})
      })

    } catch (e) {
      return {
        status: 'error',
        message: ['Не удалось обновить статусы ботов'],
        statusCode: 200,
      }
    }

    return {
      status: 'success',
      message: ['Статусы ботов обновлены'],
      statusCode: 200,
    }
  }

  async findAllBots() {
    return await this.botsModel.findAll({raw: true});
  }

  async findAll(typeBot: 'active' | 'issued', page: number, size: number, partnerId: number | null, status: EnumBotStatus[]): Promise<BotsAllResponse> {
    //TODO рефактор
    const options
      = typeBot === 'issued'
      ? {where: {partnerId: {[Op.ne]: null}, ...(partnerId && {partnerId: partnerId}), ...(status && {status: status})}}
      : {where: {partnerId: null, ...(status && {status: status})}}

    const response = await this.botsModel.findAndCountAll({
      ...options,
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['id', 'DESC'],
      ],
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
      data: response.rows.map(item => ({
        ...item,
        partnerName: item.partner?.partnerName,
      })),
      totalPages: response.count
    }
  }

  async update(updateBotDto: UpdateBotDto): Promise<Response> {
    if (updateBotDto.partnerId) {
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

  async create(createBotDto: CreateBotDto): Promise<Response> {
    const response = await this.botsModel.create({...createBotDto});

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
      partnerId: bot.partnerID,
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
      partnerID: issueBotDto.partnerId
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