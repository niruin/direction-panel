import {IWithdrawLog} from '../models/withdraw-log.model';
import {EnumStatus} from '../../withdraws/models/withdraws.model';

export class CreateWithdrawLogDto implements IWithdrawLog {
  date: Date;
  employee: string;
  event: EnumStatus;
  other: string;
  withdrawId: number;
}