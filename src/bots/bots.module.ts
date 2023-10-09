import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {Bot} from './models/bot.model';
import {BotsService} from './bots.service';
import {BotsController} from './bots.controller';
import {BotLogsModule} from '../bot-logs/bot-logs.module';
import {HttpModule} from '@nestjs/axios';
import {ProxyModule} from '../proxy/proxy.module';

@Module({
  imports: [HttpModule, BotLogsModule, ProxyModule, SequelizeModule.forFeature([Bot])],
  providers: [BotsService],
  controllers: [BotsController],
  exports: [BotsService]
})
export class BotsModule {}