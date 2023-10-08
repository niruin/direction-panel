import {ApiProperty} from '@nestjs/swagger';
import {EnumBotCheckGroupStatus, IBotCheckGroup} from '../models/bot-check-group.model';

export class CreateBotCheckGroupDto implements Omit<IBotCheckGroup, 'id'>{
  @ApiProperty({ example: ['botToken1', 'botToken2'] })
  status: EnumBotCheckGroupStatus;
  @ApiProperty({ example: ['botToken1', 'botToken2'] })
  tokens: string;
  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: 'some description' })
  description: string;
}
