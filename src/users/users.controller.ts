import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request} from '@nestjs/common';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserResponse, UserResponseType} from './interfaces/users.interface';
import {Response} from '../interfaces/interface';
import {UpdateUsernameDto} from '../auth/dto/update-username.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOkResponse({type: [UserResponse]})
  @Get('/all')
  // @Roles(Role.Admin)
  findAll(): Promise<UserResponseType[]> {
    return this.usersService.findAll();
  }

  @Post('/create-user')
  // @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}