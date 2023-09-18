import {BelongsTo, Column, CreatedAt, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';

export interface IBot {
  id: number;
  partnerId: number;
  token: string;
  botName: string
  employee: string;
}

@Table({timestamps: true, createdAt: true})
export class Bot extends Model implements IBot {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  token: string;

  @Column
  botName: string;

  @Column
  employee: string;

  @ForeignKey(() => Partner)
  @Column
  partnerId: number;

  @BelongsTo(() => Partner)
  partner: Partner;
}