import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {PartnerLogsAllResponse} from './interfaces/partner-logs.interface';
import {PartnerLog} from './models/partner-log.model';
import {CreatePartnerDto} from '../partners/dto/create-partner.dto';
import {PartnersCreateResponse} from '../partners/interfaces/partners.interface';
import {CreatePartnerLogDto} from './dto/create-partner-log.dto';

@Injectable()
export class PartnerLogsService {
  constructor(
    @InjectModel(PartnerLog)
    private readonly partnerLogModel: typeof PartnerLog,
  ) {
  }

  async create(createPartnerLogDto: CreatePartnerLogDto): Promise<PartnersCreateResponse> {
    const response = await this.partnerLogModel.create({...createPartnerLogDto});

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
