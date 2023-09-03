import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {Partner} from './models/partner.model';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {
  PartnersAllResponse,
  PartnersCreateResponse,
  PartnersRemoveResponse,
  PartnersUpdateResponse
} from './interfaces/partners.interface';
import {PartnerLogsService} from '../partner-logs/partner-logs.service';
import {CreatePartnerLogDto} from '../partner-logs/dto/create-partner-log.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner)
    private readonly partnerModel: typeof Partner,
    private readonly partnerLogsService: PartnerLogsService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto): Promise<PartnersCreateResponse> {
    const response = await this.partnerModel.create({...createPartnerDto});

    const logData: CreatePartnerLogDto = {
      date: new Date(),
      employee: '',
      event: 'Добавлен',
      other: '',
      partnerName: createPartnerDto.partnerName,
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

  async update(updatePartnerDto: UpdatePartnerDto): Promise<PartnersUpdateResponse> {
    const response = await this.partnerModel.update({...updatePartnerDto},
      {
        where: {
          id: updatePartnerDto.id,
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

    const logData: CreatePartnerLogDto = {
      date: new Date(),
      employee: '',
      event: 'Изменен',
      other: '',
      partnerName: updatePartnerDto.partnerName,
    }

    this.partnerLogsService.create(logData)

    return {
      status: 'success',
      message: [msg],
      statusCode: HttpStatus.OK,
      data: {
        effectedCount,
      }
    }
  }

  async findAll(): Promise<PartnersAllResponse> {
    const response = await this.partnerModel.findAll().catch((error) => {
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

  findOne(id: string): Promise<Partner> {
    return this.partnerModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<PartnersRemoveResponse> {
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
      employee: '',
      event: 'Удален',
      other: '',
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
