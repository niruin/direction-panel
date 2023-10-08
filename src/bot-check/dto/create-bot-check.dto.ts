import {ApiProperty} from '@nestjs/swagger';
export class CreateBotCheckDto {
  @ApiProperty({ example: 'botToken1;botToken2' })
  readonly tokens: string;
}
