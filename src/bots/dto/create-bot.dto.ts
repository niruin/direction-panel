import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBotDto {
  @ApiProperty({ example: 1 })
  readonly partnerId: number;

  @ApiProperty({ example: 'bot000' })
  @IsNotEmpty()
  readonly token: string;
}
