import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class UpdateUsernameDto {
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @ApiProperty({ example: 'nickname322' })
  @IsNotEmpty()
  readonly newUsername: string;
}
