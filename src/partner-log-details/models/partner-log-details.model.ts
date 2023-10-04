import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

import {PartnerLog} from '../../partner-logs/models/partner-log.model';
import {ICreatePartner} from '../../partners/dto/create-partner.dto';
import {EnumCurrency, EnumTariffPlan} from '../../partners/models/partner.model';

export interface IPartnerLogDetails extends ICreatePartner {
  prevPartnerName: string;
  prevUrlPanel: string;
  prevCurrency: EnumCurrency;
  prevFeeRate: number;
  prevRateBTCID: number;
  prevRateUSDTID: number;
  prevBotLimit: number;
  prevCountBotLimit: number;
  prevTariffPlan: EnumTariffPlan;
  partnerLogId: number;
}

@Table({
  tableName: 'zs_partners_logs-details'
})
export class PartnerLogDetails extends Model implements IPartnerLogDetails {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  prevPartnerName: string;
  @Column
  prevUrlPanel: string;
  @Column({
    type: DataType.ENUM(...Object.values(EnumCurrency)),
  })
  prevCurrency: EnumCurrency;
  @Column
  prevFeeRate: number;
  @Column
  prevRateBTCID: number;
  @Column
  prevRateUSDTID: number;
  @Column
  prevBotLimit: number;
  @Column
  prevCountBotLimit: number;
  @Column({
    type: DataType.ENUM(...Object.values(EnumTariffPlan)),
  })
  prevTariffPlan: EnumTariffPlan;

  @Column
  partnerName: string;
  @Column
  urlPanel: string;
  @Column({
    type: DataType.ENUM(...Object.values(EnumCurrency)),
  })
  currency: EnumCurrency;
  @Column
  feeRate: number;
  @Column
  rateBTCID: number;
  @Column
  rateUSDTID: number;
  @Column
  botLimit: number;
  @Column
  countBotLimit: number;
  @Column({
    type: DataType.ENUM(...Object.values(EnumTariffPlan)),
  })
  tariffPlan: EnumTariffPlan;

  @ForeignKey(() => PartnerLog)
  @Column
  partnerLogId: number;
  @BelongsTo(() => PartnerLog)
  partnerLog: PartnerLog;
}
