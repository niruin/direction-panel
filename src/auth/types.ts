import {ApiProperty} from '@nestjs/swagger';

export type SignInResponseType = {accessToken: string};

export class SignInResponse {
  @ApiProperty()
  accessToken: string;
}