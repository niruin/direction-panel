import {BelongsTo, Column, ForeignKey, HasOne, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {PartnerLogDetails} from '../../partner-log-details/models/partner-log-details.model';
import {LogEvent} from '../dto/create-partner-log.dto';
import {User} from '../../users/models/users.model';
import {Partner} from '../../partners/models/partner.model';

export interface IPartnerLog {
  partnerId: number;
  employeeId: number;
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
  event: LogEvent;
  @Column
  other: string;
  @Column
  date: Date;

  @HasOne( () => PartnerLogDetails)
  partnerLogDetails: PartnerLogDetails

  @ForeignKey(() => User)
  @Column
  employeeId: number;
  @BelongsTo(() => User)
  employee: User;

  @ForeignKey(() => Partner)
  @Column
  partnerId: number;
  @BelongsTo(() => Partner)
  partner: Partner;
}
