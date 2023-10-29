import {IWithdrawLog} from '../models/withdraw-log.model';
import {EnumStatus} from '../../withdraws/models/withdraws.model';

export class CreateWithdrawLogDto implements IWithdrawLog {
  withdrawId: number;
  employeeId: number;
  date: Date;
  event: EnumStatus;
  other: string;
}