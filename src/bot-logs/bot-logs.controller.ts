import {Controller, Get, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {BotLogsService} from './bot-logs.service';
import {BotLogsAllResponse} from './interfaces/bot-logs';

@ApiTags('Bot Logs')
@Controller('bot-logs')
export class BotLogsController {
  constructor(private readonly botLogService: BotLogsService) {
  }

  @ApiOkResponse({type: BotLogsAllResponse})
  @Get('/list')
  findAll(@Query() query): Promise<BotLogsAllResponse> {
    const { page = 1, size = 10, logEvent } = query
    return this.botLogService.findAll(Number(page), Number(size), logEvent);
  }
}
