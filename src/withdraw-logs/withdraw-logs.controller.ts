import {Controller, Get, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {WithdrawLogsService} from './withdraw-logs.service';
import {WithdrawLogsResponseData} from './interfaces/withdraw-logs.interface';

@ApiTags('Withdraws Logs')
@Controller('withdraws-log')
export class WithdrawsLogsController {
  constructor(private readonly withdrawLogService: WithdrawLogsService) {
  }

  @ApiOkResponse({type: [WithdrawLogsResponseData]})
  @Get('/list')
  findAll(@Query() query): Promise<WithdrawLogsResponseData[]> {
    return this.withdrawLogService.findAll(query.withdrawId);
  }
}
