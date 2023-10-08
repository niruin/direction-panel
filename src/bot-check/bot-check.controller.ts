import {ApiTags} from '@nestjs/swagger';
import {Body, Controller, Post, Request} from '@nestjs/common';
import {BotCheckService} from './bot-check.service';
import {CreateBotCheckDto} from './dto/create-bot-check.dto';

@ApiTags('Checking Bots')
@Controller('bot-check')
export class BotCheckController {
  constructor(private readonly botCheckService: BotCheckService) {
  }

  @Post('/add')
  addBots(@Request() req, @Body() createBotCheckDto: CreateBotCheckDto) {
    return this.botCheckService.addBots(createBotCheckDto.tokens, Number(req.user.id))
  }
}