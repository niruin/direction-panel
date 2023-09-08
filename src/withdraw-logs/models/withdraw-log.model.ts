import {Column, DataType, HasOne, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

import {EnumStatus} from '../../withdraws/models/withdraws.model';

export interface IWithdrawLog {
  withdrawId: number;
  employee: string;
  event: EnumStatus;
  other: string;
  date: Date;
}

@Table
export class WithdrawLog extends Model implements IWithdrawLog {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  withdrawId: number;
  @Column
  employee: string;
  @Column({type: DataType.ENUM(...Object.values(EnumStatus))})
  event: EnumStatus;
  @Column
  other: string;
  @Column
  date: Date;
}
