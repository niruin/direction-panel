import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({example: 'partner name example'})
  @IsString()
  readonly partnerName: string;

  @ApiProperty({example: '/some-url'})
  @IsString()
  readonly urlPanel: string;

  @ApiProperty({example: 'RUB'})
  @IsString()
  readonly currency: string;

  @ApiProperty({example: 1.5})
  @IsNumber()
  readonly freeRate: number;

  @ApiProperty({example: 2})
  @IsNumber()
  readonly rateBTCID: number;

  @ApiProperty({example: 3})
  @IsNumber()
  readonly rateUSDTID: number;

  @ApiProperty({example: 5})
  @IsNumber()
  readonly botLimit: number;

  @ApiProperty({example: 5})
  @IsNumber()
  readonly countBotLimit: number;
}
