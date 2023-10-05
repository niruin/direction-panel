import {ApiOkResponse, ApiProperty, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Put} from '@nestjs/common';

import {Response} from '../interfaces/interface';
import {ProxyService} from './proxy.service';
import {UpdateProxyDto} from './dto/update-proxy.dto';
import {Proxy} from './model/proxy.model';
import {ProxyAllResponse} from './interfaces/proxy.interface';

@ApiTags('Proxy')
@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {
  }

  //TODO ограничить по роли
  @Get('/list')
  @ApiOkResponse({type: ProxyAllResponse})
  getList(): Promise<ProxyAllResponse> {
    return this.proxyService.findAll();
  }

  @Put('/update')
  update(@Body() updateProxyDto: UpdateProxyDto): Promise<Response> {
    return this.proxyService.update(updateProxyDto);
  }
}