import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {PartnersModule} from './partners/partners.module';
import {PartnerLogsModule} from './partner-logs/partner-logs.module';
import {PartnerLogDetailsModule} from './partner-log-details/partner-log-details.module';
import {WithdrawsModule} from './withdraws/withdraws.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      // host: '80.78.24.127',
      host: '0.0.0.0',
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
    PartnerLogDetailsModule,
    PartnerLogsModule,
    WithdrawsModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
