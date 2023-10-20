import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {APP_GUARD} from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import * as process from 'process';
import {PartnersModule} from './partners/partners.module';
import {PartnerLogsModule} from './partner-logs/partner-logs.module';
import {PartnerLogDetailsModule} from './partner-log-details/partner-log-details.module';
import {WithdrawsModule} from './withdraws/withdraws.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {WithdrawLogsModule} from './withdraw-logs/withdraw-logs.module';
import {AuthGuard} from './auth/guard/auth.guard';
import {RolesGuard} from './auth/guard/roles.guard';
import {TokensModule} from './tokens/tokens.module';
import {BotsModule} from './bots/bots.module';
import {BotLogsModule} from './bot-logs/bot-logs.module';
import {ProxyModule} from './proxy/proxy.module';
import {BotCheckModule} from './bot-check/bot-check.module';
import {ScheduleModule} from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQLDB_HOST,
      port: parseInt(process.env.MYSQLDB_PORT),
      username: process.env.MYSQLDB_USER,
      password: process.env.MYSQLDB_PASSWORD,
      database: process.env.MYSQLDB_DATABASE,
      autoLoadModels: true,
      synchronize: false,
      define: {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    }),
    ConfigModule.forRoot(),
    PartnersModule,
    PartnerLogDetailsModule,
    PartnerLogsModule,
    WithdrawsModule,
    WithdrawLogsModule,
    UsersModule,
    AuthModule,
    TokensModule,
    BotsModule,
    BotLogsModule,
    ProxyModule,
    BotCheckModule,
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
