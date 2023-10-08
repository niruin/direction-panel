import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {HttpModule} from '@nestjs/axios';

import {BotCheck} from './models/bot-check.model';
import {BotCheckGroup} from './models/bot-check-group.model';
import {BotCheckService} from './bot-check.service';
import {BotCheckController} from './bot-check.controller';
import {BotsModule} from '../bots/bots.module';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [HttpModule, BotsModule, UsersModule, SequelizeModule.forFeature([BotCheck, BotCheckGroup])],
  providers: [BotCheckService],
  controllers: [BotCheckController],
})
export class BotCheckModule {}