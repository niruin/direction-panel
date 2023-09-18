import { ApiProperty } from '@nestjs/swagger';
import {IBot} from '../models/bot.model';

export class IssueBotDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly partnerId: number;
  @ApiProperty({ example: 'botName' })
  botName: string;
  @ApiProperty({ example: 'token' })
  token: string;
}
