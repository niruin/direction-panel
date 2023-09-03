import {Controller, Get} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {PartnerLogsAllResponse} from './interfaces/partner-logs.interface';
import {PartnerLogsService} from './partner-logs.service';

@ApiTags('Partner Logs')
@Controller('partners-log')
export class PartnerLogsController {
  constructor(private readonly partnerLogService: PartnerLogsService) {
  }

  @ApiOkResponse({type: PartnerLogsAllResponse})
  @Get('/all')
  findAll(): Promise<PartnerLogsAllResponse> {
    return this.partnerLogService.findAll();
  }
}
