export type BotLogEvent =  'Добавлен' | 'Изменен' | 'Удален' | 'Выдан';

export class CreateBotLogDto {
  event: BotLogEvent;
  botName: string;
  partnerId?: number;
}