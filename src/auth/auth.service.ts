import {BadRequestException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {UsersService} from '../users/users.service';
import {SignInResponseType} from './types';
import {Response} from '../interfaces/interface';
import {UpdateUsernameDto} from './dto/update-username.dto';
import {UpdatePasswordDto} from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(username: string, pass: string): Promise<SignInResponseType> {
    const user = await this.usersService.findByUsername(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const {id, username: nickname, role} = user;
    const payload = {id, username: nickname, role};
    const accessToken = await this.jwtService.signAsync(payload);

    return {accessToken};
  }

  async getProfile(userId: number) {
    return this.usersService.findOneById(userId);
  }

  async updateUsername(updateUsernameDto: UpdateUsernameDto, userId: number): Promise<Response> {
    const user = await this.usersService.findOneById(userId);
    if(user.password !== updateUsernameDto.password) {
      throw new BadRequestException({
        status: 'error',
        message: ['Не верный пароль'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Не верный пароль',
      })
    }

    return this.usersService.update({username: updateUsernameDto.newUsername}, userId);
  }

  async updatePasswordDto(updatePasswordDto: UpdatePasswordDto, userId: number): Promise<Response> {
    const user = await this.usersService.findOneById(userId);

    if(user.password !== updatePasswordDto.password) {
      throw new BadRequestException({
        status: 'error',
        message: ['Не верный пароль'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Не верный пароль',
      })
    }

    return this.usersService.update({password: updatePasswordDto.newPassword}, userId);
  }
}
