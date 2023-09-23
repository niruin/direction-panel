import {Body, Controller, Delete, Get, Param, Post, Put, Request} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {CreatePartnerDto} from './dto/create-partner.dto';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import {Partner} from './models/partner.model';
import {PartnersService} from './partners.service';
import {Response} from '../interfaces/interface';
import {
  PartnerResponseData,
  PartnersAllResponse,
  PartnersCreateResponse, PartnersDictionaryResponse,
  PartnersRemoveResponse
} from './interfaces/partners.interface';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {
  }

  @Post('/add')
  create(@Request() req, @Body() createPartnerDto: CreatePartnerDto): Promise<PartnersCreateResponse> {
    return this.partnersService.create(createPartnerDto, req.user.username);
  }

  @Put('/update')
  update(@Request() req, @Body() updatePartnerDto: UpdatePartnerDto): Promise<Response> {
    return this.partnersService.update(updatePartnerDto, req.user.username);
  }

  @ApiOkResponse({type: PartnersAllResponse})
  @Get('/all')
  findAll(@Param('page') page: string): Promise<PartnersAllResponse> {
    return this.partnersService.findAll();
  }

  @ApiOkResponse({type: PartnersAllResponse})
  @Get('/dictionary')
  dictionaryList(): Promise<PartnersDictionaryResponse> {
    return this.partnersService.dictionaryList();
  }

  @ApiOkResponse({type: PartnerResponseData})
  @Get(':partnerId')
  findOne(@Param('partnerId') id: string): Promise<Partner> {
    return this.partnersService.findOne(id);
  }

  @Delete('/remove/:id')
  remove(@Request() req, @Param('id') id: string): Promise<PartnersRemoveResponse> {
    return this.partnersService.remove(id, req.user.username);
  }
}
