import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Put, Query, Request} from '@nestjs/common';

import {Response} from '../_interfaces/interface';
import {BotsService} from './bots.service';
import {BotsAllResponse} from './interfaces/bots.interface';
import {UpdateBotDto} from './dto/update-bot.dto';
import {IssueBotDto} from './dto/issue-bot.dto';

@ApiTags('Bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {
  }

  @ApiOkResponse({type: BotsAllResponse})
  @Get('/list')
  findAll(@Query() query): Promise<BotsAllResponse> {
    const {page = 1, size = 10, partnerId, typeBot, status, employeeId} = query;
    const partnerIdFormat = partnerId ? Number(partnerId) : null;
    const employeeIdFormat = employeeId ? Number(employeeId) : null;
    return this.botsService.findAll(typeBot, Number(page), Number(size), partnerIdFormat, status, employeeIdFormat);
  }

  @Get('/checking')
  @ApiOkResponse({type: Response})
  checking() {
    return this.botsService.updateBots();
  }

  // @Post('/add')
  // create(@Request() req, @Body() createBotDto: CreateBotDto): Promise<Response> {
  //   return this.botsService.create(createBotDto, req.user.username);
  // }

  @Put('/update')
  update(@Body() updateBotDto: UpdateBotDto): Promise<Response> {
    return this.botsService.update(updateBotDto);
  }

  @ApiOkResponse({type: Response})
  @Put('/issue')
  execute(@Request() req, @Body() issueBotDto: IssueBotDto): Promise<Response> {
    //TODO добавить в логи сотрудника (req.user.id)
    return this.botsService.issue(issueBotDto);
  }

  @Delete('/remove/:id')
  remove(@Request() req, @Param('id') id: string): Promise<Response> {
    //TODO добавить в логи сотрудника (req.user.id)
    return this.botsService.remove(id);
  }
}