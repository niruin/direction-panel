export type BotLogEvent =  'Добавлен' | 'Изменен' | 'Удален' | 'Выдан' | 'Заблокирован';

export class CreateBotLogDto {
  event: BotLogEvent;
  botName: string;
  partnerId?: number;
}