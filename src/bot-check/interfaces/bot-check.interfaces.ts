import {ApiProperty} from '@nestjs/swagger';
import {Response} from '../../interfaces/interface';
import {EnumBotCheckGroupStatus, IBotCheckGroup} from '../models/bot-check-group.model';
import {IBotCheck} from '../models/bot-check.model';

export class BotCheckGroups implements IBotCheckGroup {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({ example: EnumBotCheckGroupStatus.completed})
  status: EnumBotCheckGroupStatus;
  @ApiProperty({example: 'botToken1;botToken2;botToken3;'})
  tokens: string;
  @ApiProperty({example: 1})
  userId: number;
  @ApiProperty({example: 'something description'})
  description: string;
  @ApiProperty({example: 42})
  totalCreated: number;
  @ApiProperty({example: 2})
  totalPassed: number;
}

export class BotCheckGroupsAllResponse extends Response {
  @ApiProperty({type: [BotCheckGroups]})
  data: BotCheckGroups[];
  @ApiProperty({example: 42})
  totalPages: number;
}

export class BotCheck implements IBotCheck {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 1})
  groupId: number;
  @ApiProperty({example: true})
  ok: boolean;
  @ApiProperty({example: 'botToken'})
  token: string;
  @ApiProperty({example: 'someusername'})
  username?: string;
}

export class BotCheckAllResponse extends Response {
  @ApiProperty({type: [BotCheck]})
  data: BotCheck[];
  @ApiProperty({example: 42})
  totalPages: number;
}