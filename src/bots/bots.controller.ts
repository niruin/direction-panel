import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Post, Put, Query} from '@nestjs/common';

import {Response} from '../interfaces/interface';
import {BotsService} from './bots.service';
import {BotsAllResponse} from './interfaces/bots.interface';
import {CreateBotDto} from './dto/create-bot.dto';
import {UpdateBotDto} from './dto/update-bot.dto';

@ApiTags('Bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {
  }

  @ApiOkResponse({type: BotsAllResponse})
  @Get('/list')
  findAll(@Query() query): Promise<BotsAllResponse> {
    const status: 'active' | 'issued' = query.status;
    return this.botsService.findAll(status);
  }

  @Post('/add')
  create(@Body() createBotDto: CreateBotDto): Promise<Response> {
    return this.botsService.create(createBotDto);
  }

  @Put('/update')
  update(@Body() updateBotDto: UpdateBotDto): Promise<Response> {
    return this.botsService.update(updateBotDto);
  }
}