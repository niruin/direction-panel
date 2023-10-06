import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {PartnerLogsAllResponse} from './interfaces/partner-logs.interface';
import {IPartnerLog, PartnerLog} from './models/partner-log.model';
import {PartnersCreateResponse} from '../partners/interfaces/partners.interface';
import {LogEvent} from './dto/create-partner-log.dto';
import {PartnerLogDetailsService} from '../partner-log-details/partner-log-details.service';
import {ICreatePartner} from '../partners/dto/create-partner.dto';
import {IPartner} from '../partners/models/partner.model';

@Injectable()
export class PartnerLogsService {
  constructor(
    @InjectModel(PartnerLog)
    private readonly partnerLogModel: typeof PartnerLog,
    private readonly partnerLogDetailsService: PartnerLogDetailsService,
  ) {
  }

  async createWithDetails(beforeUpdateUser: ICreatePartner, afterUpdateUser: IPartner, event: LogEvent, employee: string): Promise<PartnersCreateResponse> {
    const logData: IPartnerLog = {
      date: new Date(),
      employee,
      event: event,
      other: '',
      partnerId: afterUpdateUser.partnerid,
      partnerName: beforeUpdateUser.partnerName,
    }
    const response = await this.partnerLogModel.create({...logData});

    this.partnerLogDetailsService.create(beforeUpdateUser, afterUpdateUser, response.dataValues.id);

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена'],
      data: {
        id: response.dataValues.id
      }
    }
  }

  async create(data: IPartnerLog): Promise<PartnersCreateResponse> {
    const response = await this.partnerLogModel.create({...data});

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена'],
      data: {
        id: response.dataValues.id
      }
    }
  }

  async findAll(page: number, size: number, partnerId?: string,): Promise<PartnerLogsAllResponse> {
    let options = {};
    if (partnerId) {
      options = {
        ...options, where: {
          partnerId: Number(partnerId),
        },
      }
    }
    console.log('page', page);
    const response = await this.partnerLogModel.findAndCountAll(
      {
        ...options,
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
}
