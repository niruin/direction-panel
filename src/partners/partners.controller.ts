import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {Partner} from './models/partner.model';
import {PartnersService} from './partners.service';
import {Response} from '../interfaces/interface';
import {
  PartnerResponseData,
  PartnersAllResponse,
  PartnersCreateResponse,
  PartnersRemoveResponse
} from './interfaces/partners.interface';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {
  }

  @Post('/add')
  create(@Body() createPartnerDto: CreatePartnerDto): Promise<PartnersCreateResponse> {
    return this.partnersService.create(createPartnerDto);
  }

  @Put('/update')
  update(@Body() updatePartnerDto: UpdatePartnerDto): Promise<Response> {
    return this.partnersService.update(updatePartnerDto);
  }

  @ApiOkResponse({type: PartnersAllResponse})
  @Get('/all')
  findAll(): Promise<PartnersAllResponse> {
    return this.partnersService.findAll();
  }

  @ApiOkResponse({type: PartnerResponseData})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Partner> {
    return this.partnersService.findOne(id);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string): Promise<PartnersRemoveResponse> {
    return this.partnersService.remove(id);
  }
}
