import { Column, Model, Table } from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export interface IPartnerLog {
  id: number;
  partnerName: string;
  employee: string;
  event: string;
  other: string;
  date: Date;
}

@Table
export class PartnerLog extends Model implements IPartnerLog {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  partnerName: string;
  @Column
  employee: string;
  @Column
  event: string;
  @Column
  other: string;
  @Column
  date: Date;
}
