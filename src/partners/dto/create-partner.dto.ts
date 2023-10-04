import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {EnumCurrency, EnumTariffPlan} from '../models/partner.model';

export interface ICreatePartner {
  partnerName: string;
  urlPanel: string;
  currency: EnumCurrency;
  feeRate: number;
  rateBTCID: number;
  rateUSDTID: number;
  botLimit: number;
  countBotLimit: number;
  tariffPlan: EnumTariffPlan;
}

export class CreatePartnerDto implements ICreatePartner {
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
  readonly tariffPlan: EnumTariffPlan;
}
