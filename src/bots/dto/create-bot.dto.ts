import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBotDto {
  @ApiProperty({ example: 'bot000' })
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({ example: 'botName' })
  @IsNotEmpty()
  readonly botName: string;
}
