import { Column, HasOne, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {PartnerLogDetails} from '../../partner-log-details/models/partner-log-details.model';
import {LogEvent} from '../dto/create-partner-log.dto';

export interface IPartnerLog {
  partnerId: number;
  partnerName: string;
  employee: string;
  event: LogEvent;
  other: string;
  date: Date;
}

@Table({
  tableName: 'zs_partners_logs'
})
export class PartnerLog extends Model implements IPartnerLog {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  partnerId: number;
  @Column
  partnerName: string;
  @Column
  employee: string;
  @Column
  event: LogEvent;
  @Column
  other: string;
  @Column
  date: Date;

  @HasOne( () => PartnerLogDetails)
  partnerLogDetails: PartnerLogDetails
}
