import {ApiProperty} from '@nestjs/swagger';
import {Response} from '../_interfaces/interface';

export type SignInResponseType = {accessToken: string};

export class SignInResponse {
  @ApiProperty()
  accessToken: string;
}

export class QrcodeResponseData {
  @ApiProperty()
  qrcode: string;
  @ApiProperty()
  key: string;
}

export class QrcodeResponse extends Response {
  @ApiProperty({type: QrcodeResponseData})
  data: QrcodeResponseData;
}