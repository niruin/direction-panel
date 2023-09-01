import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {Partner} from './models/partner.model';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {PartnersCreateResponse, PartnersRemoveResponse, PartnersUpdateResponse} from './interfaces/partners.interface';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner)
    private readonly partnerModel: typeof Partner,
  ) {}

  async create(createPartnerDto: CreatePartnerDto): Promise<PartnersCreateResponse> {
    const response = await this.partnerModel.create({...createPartnerDto});

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

    return {
      status: 'success',
      message: [msg],
      statusCode: HttpStatus.OK,
      data: {
        effectedCount,
      }
    }
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerModel.findAll();
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

    if(!user) {
      throw new BadRequestException({
        status: 'error',
        message: ['Элемент не удален'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: `Элемент с идентификатором '${id}' не найден`,
      })
    }

    await user.destroy();

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
