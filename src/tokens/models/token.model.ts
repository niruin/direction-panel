import {Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IToken {
  id: number;
  partnerid: number;
  token: string;
}

@Table({
  tableName: 'zs_tokens'
})
export class Token extends Model implements IToken {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({ type: DataTypes.INTEGER})
  partnerid: number;
  @Column({ type: DataTypes.STRING})
  token: string;
}