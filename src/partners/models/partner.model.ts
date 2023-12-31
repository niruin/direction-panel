import {Column, Model, Table, HasMany, DataType, PrimaryKey} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Bot} from '../../bots/models/bot.model';
import {Withdraw} from '../../withdraws/models/withdraws.model';
import {Token} from '../../tokens/models/token.model';

export enum EnumCurrency {
  RUB='RUB',
  UAH='UAH',
  KZT='KZT',
}

export enum EnumTariffPlan {
  simple='simple',
  advanced='advanced',
  pro='pro',
  expert='expert',
}

export interface IPartner {
  partnerid: number;
  fiatBalance: number;
  urlPanel: string;
  partnerName: string;
  currency: EnumCurrency;
  feeRate: number;
  payWindow: number;
  rateBTCID: number;
  rateUSDTID: number;
  countBotLimit: number;
  botLimit: number;
  tariffPlan: EnumTariffPlan;
}

@Table({
  tableName: 'zs_partners'
})
export class Partner extends Model implements IPartner {
  @PrimaryKey
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  partnerid: number;
  @Column({ type: DataTypes.DECIMAL(20, 10), defaultValue: 0})
  fiatBalance: number;
  @Column({ type: DataTypes.STRING})
  urlPanel: string;
  @Column({ type: DataTypes.STRING})
  partnerName: string;
  @Column({
    type: DataType.ENUM(...Object.values(EnumCurrency)),
  })
  currency: EnumCurrency;
  @Column({ type: DataTypes.INTEGER})
  feeRate: number;
  @Column({ type: DataTypes.INTEGER})
  payWindow: number;
  @Column({ type: DataTypes.INTEGER})
  rateBTCID: number;
  @Column({ type: DataTypes.INTEGER})
  rateUSDTID: number;
  @Column({ type: DataTypes.INTEGER})
  countBotLimit: number;
  @Column({ type: DataTypes.INTEGER})
  botLimit: number;
  @Column({
    type: DataType.ENUM(...Object.values(EnumTariffPlan)),
  })
  tariffPlan: EnumTariffPlan;

  @HasMany(() => Bot)
  bot: Bot[];
  @HasMany(() => Withdraw)
  withdraw: Withdraw[];
  @HasMany(() => Token)
  token: Token[];
}
