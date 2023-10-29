import {IUser, User} from '../models/users.model';
import {ApiProperty} from '@nestjs/swagger';
import {DataType} from 'sequelize-typescript';
import {Response} from '../../_interfaces/interface';
import {PartnerDictionaryResponseData} from '../../partners/interfaces/partners.interface';
import {IPartner} from '../../partners/models/partner.model';

export enum EnumUserRole {
  Admin= 'Admin',
  Employee = 'Employee'
}


export type UserResponseType = Omit<User, 'password'>;

export class UserResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty({type: DataType.ENUM(...Object.values(EnumUserRole))})
  role: EnumUserRole
}

export class UserDictionaryResponseData implements Pick<IUser, 'id' | 'username'> {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: 'username'})
  username: string;
}

export class UserDictionaryResponse extends Response {
  @ApiProperty({type: [UserDictionaryResponseData]})
  data: UserDictionaryResponseData[];
}