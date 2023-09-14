import {Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IToken {
  id: number;
  partnerId: number;
  token: string;
}

@Table
export class Token extends Model implements IToken {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  partnerId: number;
  @Column
  token: string;
}