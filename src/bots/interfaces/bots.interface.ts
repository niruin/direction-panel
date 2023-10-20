import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../interfaces/interface';
import {EnumBotStatus, IBot} from '../models/bot.model';

export class BotResponseData implements IBot {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 1})
  partnerID: number;
  @ApiProperty({example: 'token'})
  token: string;
  @ApiProperty({example: 'partnerName'})
  partnerName: string;
  @ApiProperty({example: 'botName'})
  botName: string;
  @ApiProperty({example: 1})
  employeeId: number;
  @ApiProperty({example: 'employeeName'})
  employeeName: string;
  @ApiProperty({example: 'some description'})
  description: string;
  @ApiProperty({example: 'some date'})
  lastCheck: Date;
  @ApiProperty({example: EnumBotStatus.active})
  status: EnumBotStatus;
  @ApiProperty({example: 'some date'})
  createdAt?: Date;
}

export class BotsAllResponse extends Response {
  @ApiProperty({type: [BotResponseData]})
  data: BotResponseData[];
  @ApiProperty({example: 42})
  totalPages: number;
}