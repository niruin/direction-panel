import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {PartnerLog} from '../../partner-logs/models/partner-log.model';
import {ICreatePartner} from '../../partners/dto/create-partner.dto';

export interface IPartnerLogDetailsModel extends ICreatePartner {
  prevPartnerName: string;
  prevUrlPanel: string;
  prevCurrency: string;
  prevFreeRate: number;
  prevRateBTCID: number;
  prevRateUSDTID: number;
  prevBotLimit: number;
  prevCountBotLimit: number;
}

@Table
export class PartnerLogDetails extends Model implements IPartnerLogDetailsModel {
// export class PartnerLogDetails extends Model {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  prevPartnerName: string;
  @Column
  prevUrlPanel: string;
  @Column
  prevCurrency: string;
  @Column
  prevFreeRate: number;
  @Column
  prevRateBTCID: number;
  @Column
  prevRateUSDTID: number;
  @Column
  prevBotLimit: number;
  @Column
  prevCountBotLimit: number;

  @Column
  partnerName: string;
  @Column
  urlPanel: string;
  @Column
  currency: string;
  @Column
  freeRate: number;
  @Column
  rateBTCID: number;
  @Column
  rateUSDTID: number;
  @Column
  botLimit: number;
  @Column
  countBotLimit: number;

  @ForeignKey(() => PartnerLog)
  @Column
  partnerLogId: number;
  @BelongsTo(() => PartnerLog)
  partnerLog: PartnerLog;
}