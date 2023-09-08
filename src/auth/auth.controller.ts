import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';
import { Public } from './decorator/public.decorator';
import {SignInResponse, SignInResponseType} from './types';
import {AuthGuard} from './guard/auth.guard';


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

  @Get('profile')
  // @Roles(Role.Employee)
  getProfile(@Request() req) {
    return req.user;
    // console.log(req);
    // return "asdf";
  }
}
