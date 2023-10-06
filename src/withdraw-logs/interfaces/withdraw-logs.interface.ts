import {ApiProperty} from '@nestjs/swagger';
import {IWithdrawLog} from '../models/withdraw-log.model';
import {EnumStatus} from '../../withdraws/models/withdraws.model';
import {Response} from '../../interfaces/interface';
import {TokenResponseData} from '../../tokens/interfaces/tokens.interface';

export class WithdrawLogsResponseData implements IWithdrawLog {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 'Sat May 20 2023 11:00:40 GMT+0300 (Москва, стандартное время)'})
  date: Date;
  @ApiProperty({example: 'иванов'})
  employee: string;
  @ApiProperty({example: 'Добавлен'})
  event: EnumStatus;
  @ApiProperty({example: 'Дополнительное описание'})
  other: string;
  @ApiProperty({example: 1})
  withdrawId: number;
}

export class WithdrawLogsResponse extends Response {
  @ApiProperty({type: [WithdrawLogsResponseData]})
  data: WithdrawLogsResponseData[];
  @ApiProperty({example: 42})
  totalPages: number;
}