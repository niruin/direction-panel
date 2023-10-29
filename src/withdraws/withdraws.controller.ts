import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Put, Query, Request} from '@nestjs/common';

import {WithdrawsService} from './withdraws.service';
import {WithdrawsAllResponse, WithdrawsSendingCountResponse} from './interfaces/withdraws.interface';
import {Response} from '../_interfaces/interface';
import {ExecuteWithdrawsDto, UpdateStatusWithdrawsDto} from './dto/execute-withdraws.dto';

@ApiTags('Withdraws')
@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {
  }

  @ApiOkResponse({type: WithdrawsAllResponse})
  @Get('/list')
  findAll(@Query() query): Promise<WithdrawsAllResponse> {
    const { page = 1, size = 10, partnerId, status} = query;
    const partnerIdFormat = partnerId ? Number(partnerId) : null;
    return  this.withdrawsService.findAll(Number(page), Number(size), partnerIdFormat, status);
  }

  @ApiOkResponse({type: WithdrawsSendingCountResponse})
  @Get('/sending-count')
  sendingCount(@Query() query): Promise<WithdrawsSendingCountResponse> {
    return  this.withdrawsService.sendingCount();
  }

  @ApiOkResponse({type: Response})
  @Put('/update-status')
  updateStatus(@Request() req,@Body() updateStatusWithdrawsDto: UpdateStatusWithdrawsDto): Promise<Response> {
    return  this.withdrawsService.updateStatus(updateStatusWithdrawsDto, req.user.id);
  }

  @ApiOkResponse({type: Response})
  @Put('/execute')
  execute(@Request() req, @Body() executeWithdrawsDto: ExecuteWithdrawsDto): Promise<Response> {
    return this.withdrawsService.execute(executeWithdrawsDto, req.user.id);
  }
}