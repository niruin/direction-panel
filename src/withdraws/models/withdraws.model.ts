import {Column, Model, Table, DataType} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export enum EnumTypeWithdraw {
  tobankcard = 'tobankcard',
  tocryptowallet = 'tocryptowallet',
}

export enum EnumStatus {
  sending = 'sending',
  send = 'send',
  canceled = 'canceled',
  inprocess = 'inprocess',
}

export enum EnumCancelReason {
  client = 'client',
  operator = 'operator',
}

export interface IWithdraws {
  id: number;
  fiatamount: number;
  cryptoamount: number;
  cryptowallet: string;
  typeWithdraw: EnumTypeWithdraw;
  partnerid: number;
  status: EnumStatus;
  exchangeRate: number;
  cancelReason: EnumCancelReason;
  txid: string;
  oldBalanceClient: number;
  newBalanceClient: number;
  insertTime: Date;
  sendTime: Date;
}

@Table
export class Withdraws extends Model implements IWithdraws {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  fiatamount: number;
  @Column
  cryptoamount: number;
  @Column
  cryptowallet: string;
  @Column({
    type: DataType.ENUM(...Object.values(EnumTypeWithdraw)),
  })
  typeWithdraw: EnumTypeWithdraw;
  @Column
  partnerid: number;
  @Column({
    type: DataType.ENUM(...Object.values(EnumStatus)),
  })
  status: EnumStatus;
  @Column
  exchangeRate: number;
  @Column({
    type: DataType.ENUM(...Object.values(EnumCancelReason)),
  })
  cancelReason: EnumCancelReason;
  @Column
  txid: string;
  @Column
  oldBalanceClient: number;
  @Column
  newBalanceClient: number;
  @Column
  insertTime: Date;
  @Column
  sendTime: Date;
}