import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Response} from '../interfaces/interface'
import {EnumBotCheckPeriodHours, Proxy} from './model/proxy.model';
import {UpdateProxyDto} from './dto/update-proxy.dto';
import {ProxyAllResponse} from './interfaces/proxy.interface';

@Injectable()
export class ProxyService {
  constructor(
    @InjectModel(Proxy)
    private readonly proxyModel: typeof Proxy,
    // private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    // const job = new CronJob(CronExpression.EVERY_10_SECONDS, this.updateBots);
    // this.schedulerRegistry.addCronJob('updateStatusBots', job);
  }

  findOne(id: string): Promise<Proxy> {
    return this.proxyModel.findOne({
      where: {
        id,
      },
    });
  }

  //TODO на рефактор
  async findAll(): Promise<ProxyAllResponse> {
    const response = await this.proxyModel.findAll({raw: true}).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Не удалось загрузить данные'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    if (response.length === 0) {
      const initialProxyData: UpdateProxyDto = {
        botCheckPeriod: EnumBotCheckPeriodHours.h12,
        requestDelayMs: 100,
        port: 5508,
        protocol: 'SOCKS5',
        ip: '209.145.59.247',
        autoBotCheck: true,
      }
      await this.proxyModel.create({...initialProxyData})
      const response = await this.proxyModel.findAll({raw: true}).catch((error) => {
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
        data: [{...response[0], autoBotCheck: Boolean(response[0].autoBotCheck)}]
      }
    }

    return {
      status: 'success',
      message: ['Данные получены'],
      statusCode: HttpStatus.OK,
      data: [{...response[0], autoBotCheck: Boolean(response[0].autoBotCheck)}]
    }
  }

  // async updateBots() {
  //   const botsList = await this.botsService.findAllActive();
  //   console.log(botsList.length);
  // }

  async update(updateBotDto: UpdateProxyDto): Promise<Response> {
    // let period = CronExpression.EVERY_SECOND;
    //
    // switch (updateBotDto.botCheckPeriod) {
    //   case EnumBotCheckPeriodHours.h3:
    //     period = CronExpression.EVERY_10_SECONDS;
    //     break;
    //   case EnumBotCheckPeriodHours.h6:
    //     period = CronExpression.EVERY_6_HOURS;
    //     break;
    //   case EnumBotCheckPeriodHours.h12:
    //     period = CronExpression.EVERY_12_HOURS;
    //     break;
    //   case EnumBotCheckPeriodHours.h24:
    //     period = CronExpression.EVERY_DAY_AT_NOON;
    // }
    //
    // this.schedulerRegistry.deleteCronJob('updateStatusBots');
    // const job = new CronJob(period, this.updateBots);
    // this.schedulerRegistry.addCronJob('updateStatusBots', job);
    //
    // if (updateBotDto.autoBotCheck === true) {
    //   job.start();
    // } else if (updateBotDto.autoBotCheck === false) {
    //   job.stop();
    // }

    const response = await this.proxyModel.update({...updateBotDto},
      {
        where: {
          id: 1,
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
}