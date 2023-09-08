import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {WithdrawLog} from './models/withdraw-log.model';
import {WithdrawLogsService} from './withdraw-logs.service';
import {WithdrawsLogsController} from './withdraw-logs.controller';

@Module({
  imports: [SequelizeModule.forFeature([WithdrawLog])],
  providers: [WithdrawLogsService],
  controllers: [WithdrawsLogsController],
  exports: [WithdrawLogsService],
})
export class WithdrawLogsModule {}
