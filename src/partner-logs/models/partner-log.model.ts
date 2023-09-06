import {BelongsTo, Column, ForeignKey, HasOne, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {IPartnerLogDetailsModel, PartnerLogDetails} from '../../partner-log-details/models/partner-log-details.model';

export interface IPartnerLog {
  partnerId: number;
  partnerName: string;
  employee: string;
  event: string;
  other: string;
  date: Date;
  // partnerLogDetails: IPartnerLogDetailsModel
}

@Table
// export class PartnerLog extends Model implements IPartnerLog {
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
  event: string;
  @Column
  other: string;
  @Column
  date: Date;

  @HasOne( () => PartnerLogDetails)
  partnerLogDetails: PartnerLogDetails
}
