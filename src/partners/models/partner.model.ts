import { Column, Model, Table } from 'sequelize-typescript';

export interface IPartner {
  partnerId: number;
  fiatBalance: number;
  urlPanel: string;
  partnerName: string;
  currency: string;
  freeRate: string;
  payWindow: number;
  rateBTCID: string;
  rateUSDTID: string;
  countBotLimit: string;
  botLimit: string;
}

@Table
export class Partner extends Model implements IPartner {
  @Column
  partnerId: number;
  @Column
  fiatBalance: number;
  @Column
  urlPanel: string;
  @Column
  partnerName: string;
  @Column
  currency: string;
  @Column
  freeRate: string;
  @Column
  payWindow: number;
  @Column
  rateBTCID: string;
  @Column
  rateUSDTID: string;
  @Column
  countBotLimit: string;
  @Column
  botLimit: string;
}
