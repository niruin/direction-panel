import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserResponse, UserResponseType} from './interfaces/users.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOkResponse({type: [UserResponse]})
  @Get('/all')
  findAll(): Promise<UserResponseType[]> {
    return this.usersService.findAll();
  }

  @Post('/create-user')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}