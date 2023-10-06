import {Controller, Get, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {WithdrawLogsService} from './withdraw-logs.service';
import {WithdrawLogsResponse, WithdrawLogsResponseData} from './interfaces/withdraw-logs.interface';

@ApiTags('Withdraws Logs')
@Controller('withdraws-log')
export class WithdrawsLogsController {
  constructor(private readonly withdrawLogService: WithdrawLogsService) {
  }

  @ApiOkResponse({type: WithdrawLogsResponse})
  @Get('/list')
  findAll(@Query() query): Promise<WithdrawLogsResponse> {
    const { page = 1, size = 10, withdrawId } = query;
    return this.withdrawLogService.findAll(Number(page), Number(size), withdrawId);
  }
}

