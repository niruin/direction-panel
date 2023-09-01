import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {PartnersModule} from './partners/partners.module';

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
      synchronize: true
    }),
    PartnersModule,
  ],
})
export class AppModule {}
