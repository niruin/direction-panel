import {Column, Model, Table, HasMany, DataType} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Bot} from '../../bots/models/bot.model';
import {Withdraw} from '../../withdraws/models/withdraws.model';

export enum EnumCurrency {
  RUB='RUB',
  UAH='UAH',
  KZT='KZT',
}

export interface IPartner {
  partnerid: number;
  fiatBalance: number;
  urlPanel: string;
  partnerName: string;
  currency: EnumCurrency;
  freeRate: number;
  payWindow: number;
  rateBTCID: number;
  rateUSDTID: number;
  countBotLimit: number;
  botLimit: number;
}

@Table({
  tableName: 'zs_partners'
})
export class Partner extends Model implements IPartner {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  partnerid: number;
  @Column({ type: DataTypes.DECIMAL(20, 10)})
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
  freeRate: number;
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

  @HasMany(() => Bot)
  bot: Bot[];
  @HasMany(() => Withdraw)
  withdraw: Withdraw[];
}
