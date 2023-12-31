import { ApiProperty } from '@nestjs/swagger';
import {EnumBotStatus, IBot} from '../models/bot.model';

export class CreateBotDto implements Omit<IBot, 'id' | 'partnerID'>{
  @ApiProperty({ example: 'bot000' })
  readonly token: string;

  @ApiProperty({ example: 'botName' })
  readonly botName: string;

  @ApiProperty({ example: 'zametka descripton' })
  readonly description: string;

  @ApiProperty({ example: 1 })
  readonly employeeId: number;

  @ApiProperty({ example: 'some date' })
  readonly lastCheck: Date;

  @ApiProperty({ example: EnumBotStatus.active })
  readonly status: EnumBotStatus;
}
