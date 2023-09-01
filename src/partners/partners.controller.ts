import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreatePartnerDto } from './dto/create-partner.dto';
import { Partner } from './models/partner.model';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto): Promise<Partner> {
    return this.partnersService.create(createPartnerDto);
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
  remove(@Param('id') id: string): Promise<void> {
    return this.partnersService.remove(id);
  }
}
