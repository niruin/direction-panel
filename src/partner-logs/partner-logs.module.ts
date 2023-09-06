import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {PartnerLog} from './models/partner-log.model';
import {PartnerLogsService} from './partner-logs.service';
import {PartnerLogsController} from './partner-logs.controller';
import {PartnerLogDetailsModule} from '../partner-log-details/partner-log-details.module';

@Module({
  imports: [PartnerLogDetailsModule, SequelizeModule.forFeature([PartnerLog])],
  providers: [PartnerLogsService],
  controllers: [PartnerLogsController],
  exports: [PartnerLogsService],
})
export class PartnerLogsModule {}
