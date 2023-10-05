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

  findOneById(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      raw: true,
    });
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

  async set2FAKey(userId: number, key: string) {
    await this.userModel.update({twoFactorSecret: key},
      {
        where: {
          id: userId,
        },
      }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Данные не сохранены'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись обновлена']
    }
  }

  async update(updateUserData: IUpdateUserData, userId: number): Promise<Response> {
    let data = {}
    if(updateUserData.password) {
      data = {...data, password: updateUserData.password};
    }
    if(updateUserData.username) {
      data = {...data, username: updateUserData.username};
    }
    const response = await this.userModel.update({...data},
      {
        where: {
          id: userId,
        },
      }).catch((error) => {
      throw new BadRequestException({
        status: 'error',
        message: ['Данные не сохранены'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      })
    });

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Запись обновлена']
    }
  }
}

interface IUpdateUserData {
  username?: string;
  password?: string;
}