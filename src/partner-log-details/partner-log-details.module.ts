import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {PartnerLogDetails} from './models/partner-log-details.model';
import {PartnerLogDetailsService} from './partner-log-details.service';
import {PartnerLogDetailsController} from './partner-log-details.controller';

@Module({
  imports: [SequelizeModule.forFeature([PartnerLogDetails])],
  providers: [PartnerLogDetailsService],
  controllers: [PartnerLogDetailsController],
  exports: [PartnerLogDetailsService],
})
export class PartnerLogDetailsModule {}