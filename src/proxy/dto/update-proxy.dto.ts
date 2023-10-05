import { ApiProperty } from '@nestjs/swagger';
import {IProxy} from '../model/proxy.model';

export class UpdateProxyDto implements Omit<IProxy, 'id'>{
  @ApiProperty({ example: '123.3.3.3' })
  ip: string;
  @ApiProperty({ example: 8080})
  port: number;
  @ApiProperty({ example: 'http' })
  protocol: string;
}
