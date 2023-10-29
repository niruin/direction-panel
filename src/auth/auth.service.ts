import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {UsersService} from '../users/users.service';
import {QrcodeResponse, SignInResponseType} from './types';
import {Response} from '../_interfaces/interface';
import {UpdateUsernameDto} from './dto/update-username.dto';
import {UpdatePasswordDto} from './dto/update-password.dto';
import {IUser} from '../users/models/users.model';

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(username: string, pass: string, token?: string): Promise<SignInResponseType> {
    const user = await this.usersService.findByUsername(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const {id, username: nickname, role, twoFactorSecret} = user;

    if(twoFactorSecret) {
      if(!token) {
        return {
          accessToken: '2fa'
        }
      }

      const verified = speakeasy.totp.verify({
        secret: twoFactorSecret,
        encoding: 'base32',
        token: token
      })

      if(!verified) {
        throw new BadRequestException({
          status: 'error',
          message: ['Не верный однаразовый пароль'],
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Не верный однаразовый пароль',
        })
      }
    }

    const payload = {id, username: nickname, role};
    const accessToken = await this.jwtService.signAsync(payload);

    return {accessToken};
  }

  async getProfile(userId: number): Promise<Omit<IUser, 'twoFactorSecret'>> {
    const {username, role, password, id} = await this.usersService.findOneById(userId);

    return {
      id,
      username,
      role,
      password,
    }
  }

  async getQrcode(userId: number): Promise<QrcodeResponse> {
    const response = await this.usersService.findOneById(userId);

    if(response.twoFactorSecret) {
      throw new ForbiddenException({
        status: 'error',
        message: ['Секретный ключ уже сгенерирован', 'Если вы не можете войти в систему обратитесь к администратору'],
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Секретный ключ уже сгенерирован',
      })
    }

    const secret = speakeasy.generateSecret({
      name: 'PartnerPanel'
    })

    const generateQR = async (otpAuthUrl:string) => {
      try {
        return qrcode.toDataURL(otpAuthUrl)
      } catch (err) {
        console.error(err)
      }
    }

    const data = await generateQR(secret.otpauth_url);

    return {
      status: 'success',
      statusCode: 200,
      message: ['QR код получен'],
      data: {
        qrcode: data,
        key: secret.base32
      }
    };
  }

  async activationTwoFactorAuth(userId: string, key: string, userToken: string): Promise<Response> {
    const verified = speakeasy.totp.verify({
      secret: key,
      encoding: 'base32',
      token: userToken
    })

    if(!verified) {
      throw new BadRequestException({
        status: 'error',
        message: ['Не верный токен'],
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Не верный токен',
      })
    }

    this.usersService.set2FAKey(Number(userId), key);

    return {
      status: 'success',
      statusCode: 200,
      message: ['2FA аунтификация установлена']
    }
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
