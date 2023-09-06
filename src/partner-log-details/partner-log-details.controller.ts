import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Param} from '@nestjs/common';

import {PartnerLogDetailsService} from './partner-log-details.service';
import {PartnerLogDetailsResponse} from './interfaces/partner-log-details.interface';

@ApiTags('Partner Log Details')
@Controller('partner-log-details')
export class PartnerLogDetailsController {
  constructor(private readonly partnerLogDetailsService: PartnerLogDetailsService) {
  }

  @ApiOkResponse({type: PartnerLogDetailsResponse})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<PartnerLogDetailsResponse> {
    return this.partnerLogDetailsService.findOne(id);
  }
}