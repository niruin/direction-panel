import {ApiProperty} from '@nestjs/swagger';

import {Response} from '../../interfaces/interface';
import {IPartnerLog} from '../models/partner-log.model';


export class PartnerLogsResponseData implements IPartnerLog {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 'Sat May 20 2023 11:00:40 GMT+0300 (Москва, стандартное время)'})
  date: Date;
  @ApiProperty({example: 'иванов'})
  employee: string;
  @ApiProperty({example: 'Добавление'})
  event: string;
  @ApiProperty({example: 'Дополнительное описание'})
  other: string;
  @ApiProperty({example: 'Иванов'})
  partnerName: string;
}

export class PartnerLogsAllResponse extends Response {
  @ApiProperty({type: [PartnerLogsResponseData]})
  data: PartnerLogsResponseData[];
}