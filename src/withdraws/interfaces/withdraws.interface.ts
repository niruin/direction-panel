import {ApiProperty} from '@nestjs/swagger';
import {Response} from '../../_interfaces/interface';
import {EnumCancelReason, EnumStatus, EnumTypeWithdraw, IWithdraw} from '../models/withdraws.model';

export class WithdrawsAllResponseData implements IWithdraw {
  @ApiProperty({example: 1})
  withdrawid: number;
  @ApiProperty({example: 1})
  fiatamount: number;
  @ApiProperty({example: 1})
  cryptoamount: number;
  @ApiProperty({example: 'x3222sdf'})
  cryptowallet: string;
  @ApiProperty({example: 'tobankcard'})
  typeWithdraw: EnumTypeWithdraw;
  @ApiProperty({example: 1})
  partnerId: number;
  @ApiProperty({example: 'partnerName'})
  partnerName: string;
  @ApiProperty({example: 'sending'})
  status: EnumStatus;
  @ApiProperty({example: 1})
  exchangeRate: number;
  @ApiProperty({example: 'client'})
  cancelReason: EnumCancelReason;
  @ApiProperty({example: 'txidexmple000'})
  txid: string;
  @ApiProperty({example: 999})
  oldBalanceClient: number;
  @ApiProperty({example: 999})
  newBalanceClient: number;
  @ApiProperty({example: 'Sat May 20 2023 11:00:40 GMT+0300 (Москва, стандартное время)'})
  insertTime: Date;
  @ApiProperty({example: 'Sat May 20 2023 11:00:40 GMT+0300 (Москва, стандартное время)'})
  sendTime: Date;
}

export class WithdrawsAllResponse extends Response {
  @ApiProperty({type: [WithdrawsAllResponseData]})
  data: WithdrawsAllResponseData[];
  @ApiProperty({example: 42})
  totalCount: number;
}

export class WithdrawsSendingCountResponse extends Response {
  @ApiProperty({example: 8})
  data: number;
}