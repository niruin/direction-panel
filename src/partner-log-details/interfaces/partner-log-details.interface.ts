import {IPartnerLogDetails} from '../models/partner-log-details.model';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {Response} from '../../interfaces/interface';

export class PartnerLogDetailsResponseData implements IPartnerLogDetails {
  @ApiProperty({example: 'partner name example'})
  @IsString()
  prevPartnerName: string;

  @ApiProperty({example: '/some-url'})
  @IsString()
  prevUrlPanel: string;

  @ApiProperty({example: 'RUB'})
  @IsString()
  prevCurrency: string;

  @ApiProperty({example: 1.5})
  @IsNumber()
  prevFeeRate: number;

  @ApiProperty({example: 2})
  @IsNumber()
  prevRateBTCID: number;

  @ApiProperty({example: 3})
  @IsNumber()
  prevRateUSDTID: number;

  @ApiProperty({example: 5})
  @IsNumber()
  prevBotLimit: number;

  @ApiProperty({example: 5})
  @IsNumber()
  prevCountBotLimit: number;
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
  readonly feeRate: number;

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

  @ApiProperty({example: 1})
  @IsNumber()
  partnerLogId: number;
}

export class PartnerLogDetailsResponse extends Response {
  @ApiProperty({type: PartnerLogDetailsResponseData})
  data: PartnerLogDetailsResponseData;
}