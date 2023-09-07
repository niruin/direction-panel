import {EnumStatus, IWithdraws} from '../models/withdraws.model';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';


export type IExecuteWithdrawsDto = Pick<IWithdraws, 'cryptoamount' | 'exchangeRate' | 'txid' | 'id'>;
export type IUpdateStatusWithdrawsDto = Pick<IWithdraws, 'status' | 'id'>;

export class ExecuteWithdrawsDto implements IExecuteWithdrawsDto { @ApiProperty({example: 1})
  @IsNumber()
  readonly id: number;
  @ApiProperty({example: 1})
  @IsNumber()
  readonly cryptoamount: number;
  @ApiProperty({example: 1})
  @IsNumber()
  readonly exchangeRate: number;
  @ApiProperty({example: 'rate'})
  @IsString()
  readonly txid: string;
}

export class UpdateStatusWithdrawsDto implements IUpdateStatusWithdrawsDto {
  @ApiProperty({example: 1})
  @IsNumber()
  readonly id: number;
  @ApiProperty({example: EnumStatus.inprocess})
  readonly status: EnumStatus;
}