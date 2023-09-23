import {BelongsTo, Column, CreatedAt, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';

export interface IBot {
  id: number;
  partnerID: number;
  token: string;
  botName: string
  employee: string;
}

@Table({
  tableName: 'zs_partners_bots',
  timestamps: true,
  createdAt: true
})
export class Bot extends Model implements IBot {
  @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({ type: DataTypes.STRING})
  token: string;

  @Column({ type: DataTypes.STRING})
  botName: string;

  @Column({ type: DataTypes.STRING})
  employee: string;

  @ForeignKey(() => Partner)
  @Column({ type: DataTypes.INTEGER})
  partnerID: number;

  @BelongsTo(() => Partner)
  partner: Partner;
}