import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {PartnersModule} from './partners/partners.module';
import {PartnerLogsModule} from './partner-logs/partner-logs.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
      define: {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    }),
    PartnersModule,
    PartnerLogsModule,
  ],
})
export class AppModule {}
