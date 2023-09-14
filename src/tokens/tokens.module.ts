import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {Token} from './models/token.model';
import {TokensService} from './tokens.service';
import {TokensController} from './tokens.controller';

@Module({
  imports: [SequelizeModule.forFeature([Token])],
  providers: [TokensService],
  controllers: [TokensController]
})
export class TokensModule {}