import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Response} from '../interfaces/interface'
import {Token} from './models/token.model';
import {TokensAllResponse} from './interfaces/tokens.interface';
import {UpdateTokenDto} from './dto/update-token.dto';
import {CreateTokenDto} from './dto/create-token.dto';
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

  async findAll(page: number, size: number, partnerId: number | null): Promise<TokensAllResponse> {
    const response = await this.tokensModel.findAndCountAll({
      include: [
        {
          model: Partner,
          attributes: ['partnerName'],
        }
      ],
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['id', 'DESC'],
      ],
      raw: true,
      where: {
        ...(partnerId && {partnerid: partnerId})
      }
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
      data: response.rows.map(item => (
        {
          ...item,
          partnerName: item['partner.partnerName']
        }
      )),
      totalPages: response.count
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