import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Partner} from '../../partners/models/partner.model';

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
  // @Column({ type: DataTypes.INTEGER})
  // partnerid: number;
  @Column({ type: DataTypes.STRING})
  token: string;

  @ForeignKey(() => Partner)
  @Column({ type: DataTypes.INTEGER})
  partnerid: number;

  @BelongsTo(() => Partner)
  partner: Partner;
}