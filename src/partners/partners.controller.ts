import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {Partner} from './models/partner.model';
import {PartnersService} from './partners.service';
import {Response} from '../interfaces/interface';
import {PartnersCreateResponse, PartnersRemoveResponse} from './interfaces/partners.interface';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {
  }

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto): Promise<PartnersCreateResponse> {
    return this.partnersService.create(createPartnerDto);
  }

  @Put()
  update(@Body() updatePartnerDto: UpdatePartnerDto): Promise<Response> {
    return this.partnersService.update(updatePartnerDto);
  }

  @Get()
  findAll(): Promise<Partner[]> {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Partner> {
    return this.partnersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PartnersRemoveResponse> {
    return this.partnersService.remove(id);
  }
}
