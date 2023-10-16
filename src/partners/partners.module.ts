import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Partner } from './models/partner.model';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { PartnerLogsModule } from '../partner-logs/partner-logs.module';

@Module({
  imports: [PartnerLogsModule, SequelizeModule.forFeature([Partner])],
  providers: [PartnersService],
  controllers: [PartnersController],
  exports: [PartnersService],
})
export class PartnersModule {}
