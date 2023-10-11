import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {IPartner, Partner} from './models/partner.model';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {
  PartnersAllResponse,
  PartnersCreateResponse, PartnersDictionaryResponse,
  PartnersRemoveResponse,
  PartnersUpdateResponse
} from './interfaces/partners.interface';
import {PartnerLogsService} from '../partner-logs/partner-logs.service';
import {CreatePartnerLogDto, LogEvent} from '../partner-logs/dto/create-partner-log.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner)
    private readonly partnerModel: typeof Partner,
    private readonly partnerLogsService: PartnerLogsService,
  ) {
  }

  async create(createPartnerDto: CreatePartnerDto, username: string): Promise<PartnersCreateResponse> {
    const response = await this.partnerModel.create({...createPartnerDto});

    const logData: CreatePartnerLogDto = {
      date: new Date(),
      employee: username,
      event: 'Добавлен',
      other: '',
      partnerId: response.dataValues.partnerid,
      partnerName: response.dataValues.partnerName,
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

  async update(updatePartnerDto: UpdatePartnerDto, username: string, event?: LogEvent): Promise<PartnersUpdateResponse> {
    const beforeUpdateUser = await this.findOne(String(updatePartnerDto.partnerid));
    const response = await this.partnerModel.update({...updatePartnerDto},
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

    this.partnerLogsService.createWithDetails(beforeUpdateUser.dataValues, afterUpdateUser.dataValues, event || 'Изменен', username)

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

  async findAll(page: number, size: number): Promise<PartnersAllResponse> {
    const response = await this.partnerModel.findAndCountAll(
      {
        offset: (page - 1) * size,
        limit: size,
        order: [
          ['partnerid', 'DESC'],
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
      data: response.sort((a, b) => b.id - a.id).map(({partnerid, partnerName}: IPartner) => ({partnerid, partnerName}))
    }
  }

  findOne(partnerid: string): Promise<Partner> {
    return this.partnerModel.findOne({
      where: {
        partnerid,
      },
    });
  }

  async remove(id: string, username: string): Promise<PartnersRemoveResponse> {
    const user = await this.findOne(id);

    if (!user) {
      throw new BadRequestException({
        status: 'error',
        message: ['Элемент не удален'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: `Элемент с идентификатором '${id}' не найден`,
      })
    }

    await user.destroy();

    const logData: CreatePartnerLogDto = {
      date: new Date(),
      employee: username,
      event: 'Удален',
      other: '',
      partnerId: user.id,
      partnerName: user.partnerName,
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
