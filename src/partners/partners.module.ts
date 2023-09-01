import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Partner } from './models/partner.model';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

@Module({
  imports: [SequelizeModule.forFeature([Partner])],
  providers: [PartnersService],
  controllers: [PartnersController],
})
export class PartnersModule {}
