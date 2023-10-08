import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export enum EnumBotCheckGroupStatus {
  pending='pending',
  completed='completed',
}

export interface IBotCheckGroup {
  id: number;
  tokens: string;
  status: EnumBotCheckGroupStatus;
  userId: number;
}

@Table({
  tableName: 'zs_bot_check_group'
})
export class BotCheckGroup extends Model implements IBotCheckGroup {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataTypes.STRING})
  tokens: string;
  @Column({ type: DataType.ENUM(...Object.values(EnumBotCheckGroupStatus))})
  status: EnumBotCheckGroupStatus;
  @Column({type: DataTypes.INTEGER})
  userId: number;
}
