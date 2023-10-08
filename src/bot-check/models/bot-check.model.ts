import { Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IBotCheck {
  id: number;
  token: string;
  groupId: number;
  ok: boolean;
  username?: string;
}

@Table({
  tableName: 'zs_bot_check'
})
export class BotCheck extends Model implements IBotCheck {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataTypes.STRING})
  token: string;
  @Column({type: DataTypes.INTEGER})
  groupId: number;
  @Column({type: DataTypes.BOOLEAN})
  ok: boolean;
  @Column({type: DataTypes.STRING})
  username: string;
}
