import {IPartnerLog} from '../models/partner-log.model';

export type LogEvent =  'Добавлен' | 'Изменен' | 'Удален' | 'Коррекция лимита';

export class CreatePartnerLogDto implements Omit<IPartnerLog, 'id' | 'partnerLogDetails' >{
  date: Date;
  employeeId: number;
  partnerId: number;
  event: LogEvent;
  other: string;
}