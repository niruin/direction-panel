import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';

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

export interface IWithdraw {
  withdrawid: number;
  fiatamount: number;
  cryptoamount: number;
  cryptowallet: string;
  typeWithdraw: EnumTypeWithdraw;
  partnerId: number;
  status: EnumStatus;
  exchangeRate: number;
  cancelReason: EnumCancelReason | null;
  txid: string;
  oldBalanceClient: number;
  newBalanceClient: number;
  insertTime: Date;
  sendTime: Date;
}

@Table(
  {
    tableName: 'zs_withdraws'
  }
)
export class Withdraw extends Model implements IWithdraw {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  withdrawid: number;
  @Column({ type: DataTypes.DECIMAL(20, 10)})
  fiatamount: number;
  @Column({ type: DataTypes.DECIMAL(20, 10)})
  cryptoamount: number;
  @Column({ type: DataTypes.STRING})
  cryptowallet: string;
  @Column({
    type: DataType.ENUM(...Object.values(EnumTypeWithdraw)),
  })
  typeWithdraw: EnumTypeWithdraw;
  @Column({
    type: DataType.ENUM(...Object.values(EnumStatus)),
  })
  status: EnumStatus;
  @Column({ type: DataTypes.DECIMAL(20, 10)})
  exchangeRate: number;
  @Column({
    type: DataType.ENUM(...Object.values(EnumCancelReason)),
    defaultValue: null,
  })
  cancelReason: EnumCancelReason | null;
  @Column({ type: DataTypes.STRING})
  txid: string;
  @Column({ type: DataTypes.INTEGER})
  oldBalanceClient: number;
  @Column({ type: DataTypes.INTEGER})
  newBalanceClient: number;
  @Column({ type: DataTypes.DATE})
  insertTime: Date;
  @Column({ type: DataTypes.DATE})
  sendTime: Date;

  @ForeignKey(() => Partner)
  @Column
  partnerId: number;

  @BelongsTo(() => Partner)
  partner: Partner;
}