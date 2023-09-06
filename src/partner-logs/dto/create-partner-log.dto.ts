import {IPartnerLog} from '../models/partner-log.model';

export class CreatePartnerLogDto implements Omit<IPartnerLog, 'id' | 'partnerLogDetails' >{
  date: Date;
  employee: string;
  event: string;
  other: string;
  partnerId: number;
  partnerName: string;
}