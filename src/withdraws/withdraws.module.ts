import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {Withdraws} from './models/withdraws.model';
import {WithdrawsService} from './withdraws.service';
import {WithdrawsController} from './withdraws.controller';

@Module({
  imports: [SequelizeModule.forFeature([Withdraws])],
  providers: [WithdrawsService],
  controllers: [WithdrawsController]
})
export class WithdrawsModule {}