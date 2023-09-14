import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTokenDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 1 })
  readonly partnerId: number;

  @ApiProperty({ example: 'token000' })
  @IsNotEmpty()
  readonly token: string;
}
