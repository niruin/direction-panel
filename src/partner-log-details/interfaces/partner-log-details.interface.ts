import {IPartnerLogDetails} from '../models/partner-log-details.model';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {Response} from '../../_interfaces/interface';
import {EnumCurrency, EnumTariffPlan} from '../../partners/models/partner.model';

export class PartnerLogDetailsResponseData implements IPartnerLogDetails {
  @ApiProperty({example: 'partner name example'})
  @IsString()
  prevPartnerName: string;

  @ApiProperty({example: '/some-url'})
  @IsString()
  prevUrlPanel: string;

  @ApiProperty({example: EnumCurrency.RUB})
  @IsString()
  prevCurrency: EnumCurrency;

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

  @ApiProperty({example: EnumTariffPlan.simple})
  @IsString()
  prevTariffPlan: EnumTariffPlan;

  @ApiProperty({example: 'partner name example'})
  @IsString()
  readonly partnerName: string;

  @ApiProperty({example: '/some-url'})
  @IsString()
  readonly urlPanel: string;

  @ApiProperty({example: EnumCurrency.RUB})
  @IsString()
  readonly currency: EnumCurrency;

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

  @ApiProperty({example: EnumTariffPlan.simple})
  @IsString()
  tariffPlan: EnumTariffPlan;

  @ApiProperty({example: 1})
  @IsNumber()
  partnerLogId: number;
}

export class PartnerLogDetailsResponse extends Response {
  @ApiProperty({type: PartnerLogDetailsResponseData})
  data: PartnerLogDetailsResponseData;
}