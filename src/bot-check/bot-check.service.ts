import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {HttpService} from '@nestjs/axios';

import {Response} from '../interfaces/interface'
import {BotCheck, IBotCheck} from './models/bot-check.model';
import {BotCheckGroup, EnumBotCheckGroupStatus} from './models/bot-check-group.model';
import {BotCheckAllResponse, BotCheckGroupsAllResponse} from './interfaces/bot-check.interfaces';
import {CreateBotCheckGroupDto} from './dto/create-bot-check-group.dto';
import {HttpsProxyAgent} from 'https-proxy-agent';
import {CreateBotCheckDto} from './dto/create-bot-check.dto';
import {BotsService} from '../bots/bots.service';
import {CreateBotDto} from '../bots/dto/create-bot.dto';
import {UsersService} from '../users/users.service';

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
      totalPages: response.count
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
      totalPages: response.count
    }
  }

  async addBots(createBotCheckDto: CreateBotCheckDto, userId: number): Promise<Response> {
    const {tokens, description} = createBotCheckDto;
    const arrBotTokens = tokens.split(';').filter(Boolean);

    const newBotCheckGroup: CreateBotCheckGroupDto = {
      tokens: tokens,
      userId: userId,
      status: EnumBotCheckGroupStatus.pending,
      description: description,
    }
    const botCheckGroup = await this.botCheckGroupModel.create({...newBotCheckGroup})

    const promises = arrBotTokens.map((item, index) => {
      const checkBotPromise = this.createPromise(item);
      return new Promise(function (resolve) {
        setTimeout(function() {
          return resolve(checkBotPromise);
        }, index * 400);
      });
    })

    const resultPromises = Promise.allSettled(promises).then((data) => {
      data.forEach((item) => {
        //@ts-ignore
        const {status: statusMain, value} = item;
        if(statusMain === 'rejected') {
          const newBotCheck: Omit<IBotCheck, 'id'> = {
            groupId: botCheckGroup.id,
            username: null,
            token: null,
            ok: false,
          }
          this.botCheckModel.create({...newBotCheck})
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
          this.botCheckModel.create({...newBotCheck})
        } else {
          const newBotCheck: Omit<IBotCheck, 'id'> = {
            groupId: botCheckGroup.id,
            username: response.result.username,
            token: token,
            ok: response.ok,
          }
          this.botCheckModel.create({...newBotCheck});
          const newBot: CreateBotDto = {token, botName:response.result.username};

          this.usersService.findOneById(userId).then((user) => {
            this.botsService.create({...newBot}, user.username);
          })
        }
      })

      this.botCheckGroupModel.update(
        {status: EnumBotCheckGroupStatus.completed},
        {where: {id: botCheckGroup.id}}
      )
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
      const promise = await this.httpService.get(url, {
        // proxy: {
        //   protocol: 'http',
        //   host: '64.201.163.133',
        //   port: 80,
        // },
        // proxy: false,
        // httpsAgent: new HttpsProxyAgent('http://3.144.200.213:3128')
      })
      const result = await promise.toPromise()

      return  {
        status: 'success',
        token: botToken,
        response: result.data,
      };
    } catch (e) {
      return  {
        status: 'failed',
        token: botToken,
        response: e.response.data,
      };
    }
  }
}