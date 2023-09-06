import {IPartnerLog} from '../models/partner-log.model';

export type LogEvent =  'Добавлен' | 'Изменен' | 'Удален';

export class CreatePartnerLogDto implements Omit<IPartnerLog, 'id' | 'partnerLogDetails' >{
  date: Date;
  employee: string;
  event: LogEvent;
  other: string;
  partnerId: number;
  partnerName: string;
}