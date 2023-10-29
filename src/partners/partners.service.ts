import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {EnumTariffPlan, IPartner, Partner} from './models/partner.model';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {
  PartnersAllResponse,
  PartnersCreateResponse, PartnersDictionaryResponse,
  PartnersRemoveResponse,
  PartnersUpdateResponse
} from './interfaces/partners.interface';
import {PartnerLogsService} from '../partner-logs/partner-logs.service';
import {CreatePartnerLogDto, LogEvent} from '../partner-logs/dto/create-partner-log.dto';


const Op = require('sequelize').Op;

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner)
    private readonly partnerModel: typeof Partner,
    private readonly partnerLogsService: PartnerLogsService,
  ) {
  }

  async create(createPartnerDto: CreatePartnerDto, usernameId: number): Promise<PartnersCreateResponse> {
    const response = await this.partnerModel.create({...createPartnerDto});

    const logData: CreatePartnerLogDto = {
      date: new Date(),
      employeeId: usernameId,
      partnerId: response.dataValues.partnerid,
      event: 'Добавлен',
      other: '',
    }

    this.partnerLogsService.create(logData)

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена'],
      data: {
        id: response.dataValues.id
      }
    }
  }

  async update(updatePartnerDto: UpdatePartnerDto, usernameId: number, event?: LogEvent): Promise<PartnersUpdateResponse> {
    const beforeUpdateUser = await this.findOne(String(updatePartnerDto.partnerid));
    const response = await this.partnerModel.update({fiatBalance: beforeUpdateUser.fiatBalance, ...updatePartnerDto},
      {
        where: {
          partnerid: updatePartnerDto.partnerid,
        },
      }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Данные не сохранены'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    const afterUpdateUser = await this.findOne(String(updatePartnerDto.partnerid));

    this.partnerLogsService.createWithDetails(beforeUpdateUser, afterUpdateUser, event || 'Изменен', usernameId)

    const effectedCount = response[0];
    const msg = Boolean(effectedCount) ? 'Изменения сохранены' : 'Данные не изменены';

    return {
      status: 'success',
      message: [msg],
      statusCode: HttpStatus.OK,
      data: {
        effectedCount,
      }
    }
  }

  async findAll(page: number, size: number, partnerId: number | null, tariffPlan: EnumTariffPlan[] | undefined): Promise<PartnersAllResponse> {
    const response = await this.partnerModel.findAndCountAll(
      {
        offset: (page - 1) * size,
        limit: size,
        order: [
          ['partnerid', 'DESC'],
        ],
        raw: true,
        where: {
          ...(partnerId && {partnerid: partnerId}),
          ...(tariffPlan && {tariffPlan: [...tariffPlan]})
        },
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

  async dictionaryList(): Promise<PartnersDictionaryResponse> {
    const response = await this.partnerModel.findAll({raw: true}).catch((error) => {
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
      data: response.map(({partnerid, partnerName}: IPartner) => ({partnerid, partnerName}))
    }
  }

  findOne(partnerid: string): Promise<Partner> {
    return this.partnerModel.findOne({
      where: {
        partnerid,
      },
      raw: true,
    });
  }

  async remove(id: string, usernameId: number): Promise<PartnersRemoveResponse> {
    const partner = await this.findOne(id);

    if (!partner) {
      throw new BadRequestException({
        status: 'error',
        message: ['Элемент не удален'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: `Элемент с идентификатором '${id}' не найден`,
      })
    }

    await this.partnerModel.findOne({
      where: {
        partnerid: id
      }
    }).then(temp => {
      temp.destroy();
    })


    const logData: CreatePartnerLogDto = {
      date: new Date(),
      employeeId: usernameId,
      partnerId: partner.partnerid,
      event: 'Удален',
      other: '',
    }

    this.partnerLogsService.create(logData)

    return {
      status: 'success',
      message: ['Элемент удален'],
      statusCode: HttpStatus.OK,
      data: {
        id: Number(id),
      }
    }
  }
}
