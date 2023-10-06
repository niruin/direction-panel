import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {PartnerLogsAllResponse} from './interfaces/partner-logs.interface';
import {PartnerLogsService} from './partner-logs.service';

@ApiTags('Partner Logs')
@Controller('partners-log')
export class PartnerLogsController {
  constructor(private readonly partnerLogService: PartnerLogsService) {
  }

  @ApiOkResponse({type: PartnerLogsAllResponse})
  @Get('/list')
  findAll(@Query() query): Promise<PartnerLogsAllResponse> {
    const {page = 1, size = 10} = query;
    return this.partnerLogService.findAll(Number(page), Number(size), query.partnerId);
  }
}
