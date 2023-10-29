import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

import {EnumStatus} from '../../withdraws/models/withdraws.model';
import {User} from '../../users/models/users.model';

export interface IWithdrawLog {
  withdrawId: number;
  employeeId: number;
  event: EnumStatus;
  other: string;
  date: Date;
}

@Table({
  tableName: 'zs_withdraws_logs'
})
export class WithdrawLog extends Model implements IWithdrawLog {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  withdrawId: number;
  @Column({type: DataType.ENUM(...Object.values(EnumStatus))})
  event: EnumStatus;
  @Column
  other: string;
  @Column
  date: Date;

  @ForeignKey(() => User)
  @Column
  employeeId: number;
  @BelongsTo(() => User)
  employee: User;
}
