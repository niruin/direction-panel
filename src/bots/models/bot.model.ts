import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';
import {User} from '../../users/models/users.model';

export enum EnumBotStatus {
  active='active',
  blocked='blocked'
}

export interface IBot {
  id: number;
  partnerID: number;
  token: string;
  botName: string
  employeeId: number;
  status: EnumBotStatus;
  description: string;
  lastCheck: Date;
}

@Table({
  tableName: 'zs_partners_bots',
  timestamps: true,
  createdAt: true
})
export class Bot extends Model implements IBot {
  @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({ type: DataTypes.STRING})
  token: string;

  @Column({ type: DataTypes.STRING})
  botName: string;

  @Column({ type:  DataType.ENUM(...Object.values(EnumBotStatus))})
  status: EnumBotStatus;

  @Column({type: DataTypes.STRING})
  description: string;

  @Column({type: DataTypes.DATE})
  lastCheck: Date;

  @ForeignKey(() => Partner)
  @Column({ type: DataTypes.INTEGER})
  partnerID: number;

  @BelongsTo(() => Partner)
  partner: Partner;


  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER})
  employeeId: number;

  @BelongsTo(() => User)
  employee: User;
}