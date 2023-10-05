import {ApiProperty} from '@nestjs/swagger';

export class TwoFactorActivationDto {
  @ApiProperty({ example: 'qwerty123' })
  readonly key: string;

  @ApiProperty({ example: '123456' })
  readonly token: string;
}