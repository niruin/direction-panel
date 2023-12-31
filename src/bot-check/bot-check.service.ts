import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {HttpService} from '@nestjs/axios';

import {Response} from '../_interfaces/interface'
import {BotCheck, IBotCheck} from './models/bot-check.model';
import {BotCheckGroup, EnumBotCheckGroupStatus} from './models/bot-check-group.model';
import {BotCheckAllResponse, BotCheckGroupsAllResponse} from './interfaces/bot-check.interfaces';
import {CreateBotCheckGroupDto} from './dto/create-bot-check-group.dto';
import {CreateBotCheckDto} from './dto/create-bot-check.dto';
import {BotsService} from '../bots/bots.service';
import {CreateBotDto} from '../bots/dto/create-bot.dto';
import {UsersService} from '../users/users.service';
import {EnumBotStatus} from '../bots/models/bot.model';
import {ProxyService} from '../proxy/proxy.service';
import {SocksProxyAgent} from 'socks-proxy-agent';

@Injectable()
export class BotCheckService {
  constructor(
    @InjectModel(BotCheck)
    private readonly botCheckModel: typeof BotCheck,
    @InjectModel(BotCheckGroup)
    private readonly botCheckGroupModel: typeof BotCheckGroup,
    private readonly httpService: HttpService,
    private readonly botsService: BotsService,
    private readonly usersService: UsersService,
    private readonly proxyService: ProxyService,
  ) {
  }

  async findAllGroups(userId: number, page: number, size: number): Promise<BotCheckGroupsAllResponse> {
    const response = await this.botCheckGroupModel.findAndCountAll(
      {
        where: {
          userId: userId,
        },
        offset: (page - 1) * size,
        limit: size,
        order: [
          ['id', 'DESC'],
        ],
        raw: true
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
      totalCount: response.count
    }
  }

  async findAllBotsByGroupId(groupId: number, page: number, size: number): Promise<BotCheckAllResponse> {
    const response = await this.botCheckModel.findAndCountAll(
      {
        where: {
          groupId: groupId,
        },
        offset: (page - 1) * size,
        limit: size,
        order: [
          ['id', 'DESC'],
        ],
        raw: true
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
      totalCount: response.count
    }
  }

  async addBots(createBotCheckDto: CreateBotCheckDto, userId: number): Promise<Response> {
    const {tokens, description} = createBotCheckDto;
    const arrBotTokens = tokens.split(';').filter(Boolean);

    const uniqArrBotTokens = [...new Set(arrBotTokens)];

    const newBotCheckGroup: CreateBotCheckGroupDto = {
      tokens: tokens,
      userId: userId,
      status: EnumBotCheckGroupStatus.pending,
      description: description,
      totalCreated: uniqArrBotTokens.length,
      totalPassed: 0,
    }
    const botCheckGroup = await this.botCheckGroupModel.create({...newBotCheckGroup})

    const proxyConfig = await this.proxyService.findOne('1');
    const {requestDelayMs} = proxyConfig;
    const promises = uniqArrBotTokens.map((item, index) => {
      const checkBotPromise = this.createPromise(item);
      return new Promise(function (resolve) {
        setTimeout(function () {
          return resolve(checkBotPromise);
        }, index * requestDelayMs);
      });
    })

    Promise.allSettled(promises).then(async (data) => {
      let totalAdded = 0;

      data.forEach((item) => {
        const checkingBot = async () => {
          //@ts-ignore
          const {status: statusMain, value} = item;
          if (statusMain === 'rejected') {
            const newBotCheck: Omit<IBotCheck, 'id'> = {
              groupId: botCheckGroup.id,
              username: null,
              token: null,
              ok: false,
            }
            await this.botCheckModel.create({...newBotCheck})
            return;
          }

          //@ts-ignore
          const {status, response, token} = value;
          if (status === 'failed') {
            const newBotCheck: Omit<IBotCheck, 'id'> = {
              groupId: botCheckGroup.id,
              username: null,
              //@ts-ignore
              token: value.token,
              ok: false,
            }
            await this.botCheckModel.create({...newBotCheck})
          } else {
            const newBotCheck: Omit<IBotCheck, 'id'> = {
              groupId: botCheckGroup.id,
              username: response.result.username,
              token: token,
              ok: response.ok,
            }
            await this.botCheckModel.create({...newBotCheck});

            const newBot: CreateBotDto = {
              token,
              botName: response.result.username,
              description: description,
              status: EnumBotStatus.active,
              lastCheck: new Date(),
              employeeId: userId,
            };

            // проверка на дубликаты
            const isHasBot = await this.botsService.findOneByToken(token);
            if (!isHasBot) {
              totalAdded = totalAdded + 1;
              await this.botsService.create({...newBot});
            }
          }
        }
        checkingBot().then(async () => {
          const botCheckListByGroupId = await this.botCheckModel.findAndCountAll(
            {where: {groupId: botCheckGroup.id}, raw: true}
          )
          const totalBotsRequested = botCheckListByGroupId.count;

          this.botCheckGroupModel.update(
            {
              status: EnumBotCheckGroupStatus.completed,
              totalCreated: totalBotsRequested,
              totalPassed: totalAdded
            },
            {where: {id: botCheckGroup.id}}
          )
        });
      })
    });

    return {
      status: 'success',
      statusCode: 200,
      message: ['Данные обработаны']
    }
  }

  async createPromise(botToken) {
    try {
      const url = `https://api.telegram.org/bot${botToken}/getMe`;
      const proxyConfig = await this.proxyService.findOne('1');
      const {protocol, ip, port, requestDelayMs} = proxyConfig;
      const proxyOptions = `${protocol}://${ip}:${port}`;
      const httpsAgent = new SocksProxyAgent(proxyOptions);

      const promise = await this.httpService.get(url, {
        httpsAgent: httpsAgent
      })
      const result = await promise.toPromise()

      return {
        status: 'success',
        token: botToken,
        response: result.data,
      };
    } catch (e) {
      return {
        status: 'failed',
        token: botToken,
        response: e.response.data,
      };
    }
  }
}