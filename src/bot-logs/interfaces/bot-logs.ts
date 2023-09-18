import {ApiProperty} from '@nestjs/swagger';
import {Response} from '../../interfaces/interface';
import {IBotLog} from '../models/bot-logs.model';
import {BotLogEvent} from '../dto/create-bot-log.dto';

export class BotLogsResponseData implements IBotLog {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 'Удален'})
  event: BotLogEvent;
  @ApiProperty({example: 'name'})
  partnerId: number;
  @ApiProperty({example: 'Иванов'})
  botName: string;
}

export class BotLogsAllResponse extends Response {
  @ApiProperty({type: [BotLogsResponseData]})
  data: BotLogsResponseData[];
}