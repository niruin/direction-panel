import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {PartnersModule} from './partners/partners.module';
import {PartnerLogsModule} from './partner-logs/partner-logs.module';
import {PartnerLogDetailsModule} from './partner-log-details/partner-log-details.module';
import {WithdrawsModule} from './withdraws/withdraws.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {WithdrawLogsModule} from './withdraw-logs/withdraw-logs.module';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from './auth/guard/auth.guard';
import {RolesGuard} from './auth/guard/roles.guard';
import {TokensModule} from './tokens/tokens.module';
import {BotsModule} from './bots/bots.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      // host: '128.72.71.122',
      host: '80.78.24.127',
      // host: '0.0.0.0',
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
    WithdrawLogsModule,
    UsersModule,
    AuthModule,
    TokensModule,
    BotsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule {}
