import {BelongsTo, Column, CreatedAt, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';

export interface IProxy {
  id: number;
  protocol: string;
  ip: string;
  port: number;
}

@Table({
  tableName: 'zs_proxy'
})
export class Proxy extends Model implements IProxy {
  @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataTypes.STRING})
  protocol: string;

  @Column({ type: DataTypes.STRING})
  ip: string;

  @Column({ type: DataTypes.INTEGER})
  port: number;
}