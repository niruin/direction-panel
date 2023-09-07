import {User} from '../models/users.model';
import {ApiProperty} from '@nestjs/swagger';
import {DataType} from 'sequelize-typescript';

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