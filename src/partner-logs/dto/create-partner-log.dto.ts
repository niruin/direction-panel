import {IPartnerLog} from '../models/partner-log.model';

export class CreatePartnerLogDto implements Omit<IPartnerLog, 'id'>{
  date: Date;
  employee: string;
  event: string;
  other: string;
  partnerName: string;
}