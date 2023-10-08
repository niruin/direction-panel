import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';

export enum EnumBotCheckPeriodHours {
  h3 = '3h',
  h6 = '6h',
  h12 = '12h',
  h24 = '24h',
}

export interface IProxy {
  id: number;
  protocol: string;
  ip: string;
  port: number;
  botCheckPeriod: EnumBotCheckPeriodHours
  requestDelayMs: number;
  autoBotCheck: boolean;
}

@Table({
  tableName: 'zs_proxy'
})
export class Proxy extends Model implements IProxy {
  @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataTypes.STRING})
  protocol: string;

  @Column({type: DataTypes.STRING})
  ip: string;

  @Column({type: DataTypes.INTEGER})
  port: number;

  @Column({type: DataType.ENUM(...Object.values(EnumBotCheckPeriodHours))})
  botCheckPeriod: EnumBotCheckPeriodHours;

  @Column({type: DataTypes.INTEGER})
  requestDelayMs: number;

  @Column({type: DataTypes.BOOLEAN})
  autoBotCheck: boolean;
}