import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Partner extends Model {
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
