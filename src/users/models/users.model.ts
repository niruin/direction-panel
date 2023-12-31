import {EnumUserRole} from '../interfaces/users.interface';
import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IUser {
  id: number;
  username: string;
  password: string;
  twoFactorSecret: string;
  role: EnumUserRole;
}

@Table({
  tableName: 'zs_users'
})
export class User extends Model implements IUser {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({ type: DataTypes.STRING})
  username: string;
  @Column({ type: DataTypes.STRING})
  password: string;
  @Column({ type: DataTypes.STRING})
  twoFactorSecret: string;
  @Column({type: DataType.ENUM(...Object.values(EnumUserRole))})
  role: EnumUserRole;
}