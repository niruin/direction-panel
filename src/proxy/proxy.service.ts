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
  ) {
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
    const response = await this.proxyModel.findAll({ raw: true}).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Не удалось загрузить данные'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    if(response.length === 0) {
      const initialProxyData: UpdateProxyDto = {
        botCheckPeriod: EnumBotCheckPeriodHours.h6,
        requestDelayMs: 100,
        port: 80,
        protocol: 'http',
        ip: 'localhost-example',
        autoBotCheck: true,
      }
      await this.proxyModel.create({...initialProxyData})
      const response = await this.proxyModel.findAll({ raw: true}).catch((error) => {
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

  async update(updateBotDto: UpdateProxyDto): Promise<Response> {
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