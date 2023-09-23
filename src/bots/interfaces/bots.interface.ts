import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../interfaces/interface';
import {IBot} from '../models/bot.model';

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
  @ApiProperty({example: 'employee'})
  employee: string;
}

export class BotsAllResponse extends Response {
  @ApiProperty({type: [BotResponseData]})
  data: BotResponseData[];
}