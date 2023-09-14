import {Column, CreatedAt, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IBot {
  id: number;
  partnerId: number;
  token: string;
}

@Table({timestamps: true, createdAt: true})
export class Bot extends Model implements IBot {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  partnerId: number;
  @Column
  token: string;

}