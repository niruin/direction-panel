import {EnumStatus, IWithdraw} from '../models/withdraws.model';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsOptional, IsString} from 'class-validator';


export type IExecuteWithdrawsDto = Pick<IWithdraw, 'cryptoamount' | 'exchangeRate' | 'txid' | 'withdrawid'>;
export type IUpdateStatusWithdrawsDto = Pick<IWithdraw, 'status' | 'withdrawid'>;

export class ExecuteWithdrawsDto implements IExecuteWithdrawsDto {
  @ApiProperty({example: 1})
  @IsNumber()
  readonly withdrawid: number;
  @ApiProperty({example: 200})
  @IsNumber()
  @IsOptional()
  readonly cryptoamount: number;
  @ApiProperty({example: 98.5})
  @IsNumber()
  @IsOptional()
  readonly exchangeRate: number;
  @ApiProperty({example: 'sometxid'})
  @IsString()
  @IsOptional()
  readonly txid: string;
}

export class UpdateStatusWithdrawsDto implements IUpdateStatusWithdrawsDto {
  @ApiProperty({example: 1})
  @IsNumber()
  readonly withdrawid: number;
  @ApiProperty({example: EnumStatus.inprocess})
  readonly status: EnumStatus;
}