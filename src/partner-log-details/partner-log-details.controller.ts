import { ApiTags} from '@nestjs/swagger';
import {Controller, Get, Param} from '@nestjs/common';

import {PartnerLogDetailsService} from './partner-log-details.service';

@ApiTags('Partner Log Details')
@Controller('partner-log-details')
export class PartnerLogDetailsController {
  constructor(private readonly partnerLogDetailsService: PartnerLogDetailsService) {
  }

  // @ApiOkResponse({type: PartnerLogsAllResponse})
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.partnerLogDetailsService.findOne(id);
  }
}