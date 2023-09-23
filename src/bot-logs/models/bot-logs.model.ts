import { Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {BotLogEvent} from '../dto/create-bot-log.dto';

export interface IBotLog {
  event: BotLogEvent;
  botName: string;
  partnerId: number;
}

@Table({
  tableName: 'zs_partners_bots_logs'
})
export class BotLog extends Model implements IBotLog {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  event: BotLogEvent;
  @Column
  botName: string;
  @Column
  partnerId: number;
}
