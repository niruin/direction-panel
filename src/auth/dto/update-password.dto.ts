import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @ApiProperty({ example: 'newQwerty123' })
  @IsNotEmpty()
  readonly newPassword: string;
}
