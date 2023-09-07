import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user' })
  readonly username: string;

  @ApiProperty({ example: '654321' })
  readonly password: string;
}
