import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Bot} from '../../bots/models/bot.model';

export interface IPartner {
  id: number;
  fiatBalance: number;
  urlPanel: string;
  partnerName: string;
  currency: string;
  freeRate: number;
  payWindow: number;
  rateBTCID: number;
  rateUSDTID: number;
  countBotLimit: number;
  botLimit: number;
}

@Table
export class Partner extends Model implements IPartner {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  fiatBalance: number;
  @Column
  urlPanel: string;
  @Column
  partnerName: string;
  @Column
  currency: string;
  @Column
  freeRate: number;
  @Column
  payWindow: number;
  @Column
  rateBTCID: number;
  @Column
  rateUSDTID: number;
  @Column
  countBotLimit: number;
  @Column
  botLimit: number;

  @HasMany(() => Bot)
  bot: Bot[];
}
