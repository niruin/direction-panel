import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {ProxyController} from './proxy.controller';
import {ProxyService} from './proxy.service';
import {Proxy} from './model/proxy.model';
import {BotsModule} from '../bots/bots.module';

@Module({
  imports: [SequelizeModule.forFeature([Proxy])],
  providers: [ProxyService],
  controllers: [ProxyController],
  exports: [ProxyService]
})
export class ProxyModule {}