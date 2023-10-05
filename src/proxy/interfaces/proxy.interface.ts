import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../interfaces/interface';
import {IProxy} from '../model/proxy.model';

export class ProxyResponseData implements IProxy {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({ example: '123.3.3.3' })
  ip: string;
  @ApiProperty({ example: 8080})
  port: number;
  @ApiProperty({ example: 'http' })
  protocol: string;
}

export class ProxyAllResponse extends Response {
  @ApiProperty({type: [ProxyResponseData]})
  data: ProxyResponseData[];
}