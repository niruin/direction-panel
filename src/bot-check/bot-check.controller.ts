import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Param, Post, Query, Request} from '@nestjs/common';

import {BotCheckService} from './bot-check.service';
import {CreateBotCheckDto} from './dto/create-bot-check.dto';
import {BotCheckAllResponse, BotCheckGroupsAllResponse} from './interfaces/bot-check.interfaces';
import {Response} from '../_interfaces/interface';

@ApiTags('Bot check')
@Controller('bot-check')
export class BotCheckController {
  constructor(private readonly botCheckService: BotCheckService) {
  }

  @Get('list/:groupId')
  @ApiOkResponse({type: BotCheckAllResponse})
  findAllBotsByGroupId(@Param('groupId') groupId: string, @Query() query): Promise<BotCheckAllResponse> {
    const {page = 1, size = 10} = query;
    return this.botCheckService.findAllBotsByGroupId(Number(groupId), Number(page), Number(size))
  }

  @Get('groups')
  @ApiOkResponse({type: BotCheckGroupsAllResponse})
  findAllGroups(@Request() req, @Query() query): Promise<BotCheckGroupsAllResponse> {
    const {page = 1, size = 10} = query;
    return this.botCheckService.findAllGroups(Number(req.user.id), Number(page), Number(size));
  }

  @Post('/add')
  @ApiOkResponse({type: Response})
  addBots(@Request() req, @Body() createBotCheckDto: CreateBotCheckDto): Promise<Response> {
    return this.botCheckService.addBots(createBotCheckDto, Number(req.user.id))
  }
}