import {BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {User} from './models/users.model';
import {CreateUserDto} from './dto/create-user.dto';
import {Response} from '../interfaces/interface';
import {UserResponseType} from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<Response> {
    const response = await this.userModel.create({...createUserDto})

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись добавлена']
    }
  }

  async findAll(): Promise<UserResponseType[]> {
    const response = await this.userModel.findAll({raw: true}).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Не удалось загрузить данные'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    // return {
    //   status: 'success',
    //   message: ['Данные получены'],
    //   statusCode: HttpStatus.OK,
    //   data: response
    // }

    const result  = response.map(item => {
      return {
        id: item.id,
        username: item.username,
        role: item.role,
      }
    })

    // @ts-ignore
    return result.sort((a,b) => b.id - a.id);
  }

  findOne(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne(username);
  }
}