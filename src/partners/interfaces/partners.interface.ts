import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../interfaces/interface';

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