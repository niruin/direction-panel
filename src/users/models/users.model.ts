import {EnumUserRole} from '../interfaces/users.interface';
import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IUser {
  id: number;
  username: string;
  role: EnumUserRole;
}

@Table
export class User extends Model implements IUser {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  username: string;
  @Column
  password: string;
  @Column({type: DataType.ENUM(...Object.values(EnumUserRole))})
  role: EnumUserRole;
}