import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserDictionaryResponse, UserResponse, UserResponseType} from './interfaces/users.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOkResponse({type: [UserResponse]})
  @Get('/list')
  findAll(): Promise<UserResponseType[]> {
    return this.usersService.findAll();
  }

  @ApiOkResponse({type: UserDictionaryResponse})
  @Get('/dictionary')
  dictionaryList(): Promise<UserDictionaryResponse> {
    return this.usersService.dictionaryList();
  }

  @Post('/create-user')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}