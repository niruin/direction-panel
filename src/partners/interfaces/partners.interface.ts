import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../_interfaces/interface';
import {EnumCurrency, EnumTariffPlan, IPartner} from '../models/partner.model';

class PartnersCreateResponseData {
  @ApiProperty({example: 'success'})
  id: number;
}

export class PartnersCreateResponse extends Response {
  @ApiProperty({example: {id: 1}})
  data: PartnersCreateResponseData;
}

class PartnersUpdateResponseData {
  @ApiProperty({example: 1})
  effectedCount: number;
}

export class PartnersUpdateResponse extends Response {
  @ApiProperty({example: {effectedCount: 1}})
  data: PartnersUpdateResponseData
}

class PartnersRemoveResponseData {
  @ApiProperty({example: 1})
  id: number;
}

export class PartnersRemoveResponse extends Response {
  @ApiProperty({example: {id: 1}})
  data: PartnersRemoveResponseData
}

export class PartnerResponseData implements IPartner {
  @ApiProperty({example: 1})
  partnerid: number;
  @ApiProperty({example: 10})
  fiatBalance: number;
  @ApiProperty({example: '/some-url'})
  urlPanel: string;
  @ApiProperty({example: 'partner name example'})
  partnerName: string;
  @ApiProperty({example: EnumCurrency.RUB})
  currency: EnumCurrency;
  @ApiProperty({example: 1.5})
  feeRate: number;
  @ApiProperty({example: 20})
  payWindow: number;
  @ApiProperty({example: 2})
  rateBTCID: number;
  @ApiProperty({example: 3})
  rateUSDTID: number;
  @ApiProperty({example: 5})
  countBotLimit: number;
  @ApiProperty({example: 5})
  botLimit: number;
  @ApiProperty({example: EnumTariffPlan.simple,})
  tariffPlan: EnumTariffPlan;
}

export class PartnersAllResponse extends Response {
  @ApiProperty({type: [PartnerResponseData]})
  data: PartnerResponseData[];
  @ApiProperty({example: 42})
  totalCount: number;
}

export class PartnerDictionaryResponseData implements Pick<IPartner, 'partnerid' | 'partnerName'> {
  @ApiProperty({example: 1})
  partnerid: number;
  @ApiProperty({example: 'PartnerName'})
  partnerName: string;
}

export class PartnersDictionaryResponse extends Response {
  @ApiProperty({type: [PartnerDictionaryResponseData]})
  data: PartnerDictionaryResponseData[];
}