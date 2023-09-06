import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {PartnerLogsAllResponse} from './interfaces/partner-logs.interface';
import {IPartnerLog, PartnerLog} from './models/partner-log.model';
import {PartnersCreateResponse} from '../partners/interfaces/partners.interface';
import {CreatePartnerLogDto} from './dto/create-partner-log.dto';
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

  async create(beforeUpdateUser: ICreatePartner, afterUpdateUser: IPartner): Promise<PartnersCreateResponse> {
    const logData: IPartnerLog = {
      date: new Date(),
      employee: '',
      event: 'Добавлен',
      other: '',
      partnerId: afterUpdateUser.id,
      partnerName: beforeUpdateUser.partnerName,
    }
    const response = await this.partnerLogModel.create({...logData});

    this.partnerLogDetailsService.create(beforeUpdateUser, afterUpdateUser);

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена'],
      data: {
        id: response.dataValues.id
      }
    }
  }

  async findAll(): Promise<PartnerLogsAllResponse> {
    const response = await this.partnerLogModel.findAll().catch((error) => {
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
      data: response
    }
  }
}
