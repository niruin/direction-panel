import {ApiProperty} from '@nestjs/swagger';

type StatusText = 'success' | 'error';
export class Response {
  @ApiProperty({ example: 'success' })
  status: StatusText;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Данные внесены' })
  message: string[];

  @ApiProperty({ example: 'Не удалось сохранить данные' })
  error?: string;
}