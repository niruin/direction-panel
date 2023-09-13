import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Put, Request} from '@nestjs/common';

import {WithdrawsService} from './withdraws.service';
import {WithdrawsAllResponse} from './interfaces/withdraws.interface';
import {Response} from '../interfaces/interface';
import {ExecuteWithdrawsDto, UpdateStatusWithdrawsDto} from './dto/execute-withdraws.dto';

@ApiTags('Withdraws')
@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {
  }

  @ApiOkResponse({type: WithdrawsAllResponse})
  @Get('/all')
  findAll(): Promise<WithdrawsAllResponse> {
    return  this.withdrawsService.findAll();
  }

  @ApiOkResponse({type: Response})
  @Put('/update-status')
  updateStatus(@Request() req,@Body() updateStatusWithdrawsDto: UpdateStatusWithdrawsDto): Promise<Response> {
    return  this.withdrawsService.updateStatus(updateStatusWithdrawsDto, req.user.username);
  }

  @ApiOkResponse({type: Response})
  @Put('/execute')
  execute(@Request() req, @Body() executeWithdrawsDto: ExecuteWithdrawsDto): Promise<Response> {
    return this.withdrawsService.execute(executeWithdrawsDto, req.user.username);
  }
}