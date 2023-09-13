import {Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorator/public.decorator';
import {SignInResponse, SignInResponseType} from './types';
import {UpdateUsernameDto} from './dto/update-username.dto';
import {Response} from '../interfaces/interface';
import {UpdatePasswordDto} from './dto/update-password.dto';

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
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Put('/update-username')
  @HttpCode(HttpStatus.OK)
  updateUsername(@Request() req, @Body() updateUsernameDto: UpdateUsernameDto): Promise<Response> {
    return this.authService.updateUsername(updateUsernameDto, req.user.id);
  }

  @Put('/update-password')
  @HttpCode(HttpStatus.OK)
  updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto): Promise<Response> {
    return this.authService.updatePasswordDto(updatePasswordDto, req.user.id);
  }
}
