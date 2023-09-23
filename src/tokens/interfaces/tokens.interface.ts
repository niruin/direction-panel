import {EnumCancelReason, EnumStatus, EnumTypeWithdraw, IWithdraw} from '../../withdraws/models/withdraws.model';
import {ApiProperty} from '@nestjs/swagger';
import {Response} from '../../interfaces/interface';
import {IToken} from '../models/token.model';

export class TokenResponseData implements IToken {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 1})
  partnerid: number;
  @ApiProperty({example: 'token'})
  token: string;
}

export class TokensAllResponse extends Response {
  @ApiProperty({type: [TokenResponseData]})
  data: TokenResponseData[];
}