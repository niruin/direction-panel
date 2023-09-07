import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import {SignInResponseType} from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<SignInResponseType> {
    const user = await this.usersService.findByUsername(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { id, username: nickname, role } = user;
    const payload = { id, username: nickname, role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
