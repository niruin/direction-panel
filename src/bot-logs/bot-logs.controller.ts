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
  findAll(): Promise<BotLogsAllResponse> {
    return this.botLogService.findAll();
  }
}
