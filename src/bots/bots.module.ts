import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {Bot} from './models/bot.model';
import {BotsService} from './bots.service';
import {BotsController} from './bots.controller';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  providers: [BotsService],
  controllers: [BotsController]
})
export class BotsModule {}