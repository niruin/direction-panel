import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../interfaces/interface';
import {IPartner} from '../models/partner.model';

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
  partnerId: number;
  @ApiProperty({example: 10})
  fiatBalance: number;
  @ApiProperty({example: '/some-url'})
  urlPanel: string;
  @ApiProperty({example: 'partner name example'})
  partnerName: string;
  @ApiProperty({example: 'RUB'})
  currency: string;
  @ApiProperty({example: 1.5})
  freeRate: string;
  @ApiProperty({example: 20})
  payWindow: number;
  @ApiProperty({example: 2})
  rateBTCID: string;
  @ApiProperty({example: 3})
  rateUSDTID: string;
  @ApiProperty({example: 5})
  countBotLimit: string;
  @ApiProperty({example: 5})
  botLimit: string;
}

export class PartnersAllResponse extends Response {
  @ApiProperty({type: [PartnerResponseData]})
  data: PartnerResponseData[];
}