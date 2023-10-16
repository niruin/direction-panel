import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {Withdraw} from './models/withdraws.model';
import {WithdrawsService} from './withdraws.service';
import {WithdrawsController} from './withdraws.controller';
import {WithdrawLogsModule} from '../withdraw-logs/withdraw-logs.module';
import {PartnersModule} from '../partners/partners.module';

@Module({
  imports: [WithdrawLogsModule, PartnersModule,  SequelizeModule.forFeature([Withdraw])],
  providers: [WithdrawsService],
  controllers: [WithdrawsController]
})
export class WithdrawsModule {}