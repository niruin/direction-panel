import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Put} from '@nestjs/common';

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
  updateStatus(@Body() updateStatusWithdrawsDto: UpdateStatusWithdrawsDto): Promise<Response> {
    return  this.withdrawsService.updateStatus(updateStatusWithdrawsDto);
  }

  @ApiOkResponse({type: Response})
  @Put('/execute')
  execute(@Body() executeWithdrawsDto: ExecuteWithdrawsDto): Promise<Response> {
    return this.withdrawsService.execute(executeWithdrawsDto);
  }
}