import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Response} from '../interfaces/interface'
import {Token} from './models/token.model';
import {TokensAllResponse} from './interfaces/tokens.interface';
import {UpdateTokenDto} from './dto/update-token.dto';
import {CreateTokenDto} from './dto/create-token.dto';
import {PartnersRemoveResponse} from '../partners/interfaces/partners.interface';
import {CreatePartnerLogDto} from '../partner-logs/dto/create-partner-log.dto';
import {Partner} from '../partners/models/partner.model';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token)
    private readonly tokensModel: typeof Token
  ) {
  }

  findOne(id: string): Promise<Token> {
    return this.tokensModel.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<TokensAllResponse> {
    const response = await this.tokensModel.findAll({
      include: [
        {
          model: Partner,
          attributes: ['partnerName'],
        }
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
      data: response.sort((a, b) => b.id - a.id).map(item => (
        {
          ...item,
          partnerName: item['partner.partnerName']
        }
      ))
    }
  }

  async update(updateTokenDto: UpdateTokenDto): Promise<Response> {
    const response = await this.tokensModel.update({...updateTokenDto},
      {
        where: {
          id: updateTokenDto.id,
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

  async create(createTokenDto: CreateTokenDto): Promise<Response> {
    const response = await this.tokensModel.create({...createTokenDto});

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена']
    }
  }

  async remove(id: string): Promise<Response> {
    const token = await this.findOne(id);

    if (!token) {
      throw new BadRequestException({
        status: 'error',
        message: ['Элемент не удален'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: `Элемент с идентификатором '${id}' не найден`,
      })
    }

    await token.destroy();

    return {
      status: 'success',
      message: ['Элемент удален'],
      statusCode: HttpStatus.OK,
    }
  }
}