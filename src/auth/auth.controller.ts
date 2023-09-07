import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';
import { Public } from './decorator/public.decorator';
import {SignInResponse, SignInResponseType} from './types';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({type: SignInResponse})
  @Post('authorization')
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseType> {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }

  // @Get('profile')
  // @Roles(Role.User)
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
