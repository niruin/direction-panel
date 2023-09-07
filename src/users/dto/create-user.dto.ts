import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import {EnumUserRole} from '../interfaces/users.interface';

export class CreateUserDto {
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @ApiProperty({ example: 'nickname322' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: EnumUserRole.Employee })
  @IsNotEmpty()
  readonly role: EnumUserRole;
}
