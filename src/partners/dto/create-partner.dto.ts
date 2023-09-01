import {ApiProperty} from '@nestjs/swagger';
import {IsEmpty, IsNotEmpty, IsString} from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({example: 'partner name example'})
  @IsString()
  readonly partnerName: string;

  @ApiProperty({example: '/some-url'})
  @IsString()
  readonly urlPanel: string;

  // @ApiProperty({example: 'RUB'})
  // readonly currency: string;
  //
  // @ApiProperty({example: 1.5})
  // readonly freeRate: number;
  //
  // @ApiProperty({example: 2})
  // readonly rateBTCID: number;
  //
  // @ApiProperty({example: 3})
  // readonly rateUSDTID: number;
  //
  // @ApiProperty({example: 5})
  // readonly botLimit: number;
  //
  // @ApiProperty({example: 5})
  // readonly countBotLimit: number;
}
