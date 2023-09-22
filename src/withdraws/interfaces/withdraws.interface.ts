import {Response} from '../../interfaces/interface';
import {ApiProperty} from '@nestjs/swagger';
import {EnumCancelReason, EnumStatus, EnumTypeWithdraw, IWithdraws} from '../models/withdraws.model';

export class WithdrawsAllResponseData implements IWithdraws {
  @ApiProperty({example: 1})
  id: number;
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
}