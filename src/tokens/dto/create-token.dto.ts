import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({ example: 1 })
  readonly partnerid: number;

  @ApiProperty({ example: 'token000' })
  @IsNotEmpty()
  readonly token: string;
}
