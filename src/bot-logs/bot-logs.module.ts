import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {BotLogsService} from './bot-logs.service';
import {BotLogsController} from './bot-logs.controller';
import {BotLog} from './models/bot-logs.model';

@Module({
  imports: [SequelizeModule.forFeature([BotLog])],
  providers: [BotLogsService],
  controllers: [BotLogsController],
  exports: [BotLogsService],
})
export class BotLogsModule {}
