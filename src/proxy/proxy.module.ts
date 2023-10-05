import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {ProxyController} from './proxy.controller';
import {ProxyService} from './proxy.service';
import {Proxy} from './model/proxy.model';

@Module({
  imports: [SequelizeModule.forFeature([Proxy])],
  providers: [ProxyService],
  controllers: [ProxyController]
})
export class ProxyModule {}