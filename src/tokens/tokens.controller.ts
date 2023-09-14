import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Post, Put, Request} from '@nestjs/common';

import {Response} from '../interfaces/interface';
import {TokensService} from './tokens.service';
import {TokensAllResponse} from './interfaces/tokens.interface';
import {CreateTokenDto} from './dto/create-token.dto';
import {UpdateTokenDto} from './dto/update-token.dto';

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {
  }

  @ApiOkResponse({type: TokensAllResponse})
  @Get('/list')
  findAll(): Promise<TokensAllResponse> {
    return this.tokensService.findAll();
  }

  @Post('/add')
  create(@Body() createTokenDto: CreateTokenDto): Promise<Response> {
    return this.tokensService.create(createTokenDto);
  }

  @Put('/update')
  update(@Body() UpdateTokenDto: UpdateTokenDto): Promise<Response> {
    return this.tokensService.update(UpdateTokenDto);
  }
}