import {ApiProperty} from '@nestjs/swagger';
import {CreatePartnerDto} from './create-partner.dto';

export class UpdatePartnerDto extends CreatePartnerDto {
  @ApiProperty({example: 1})
  readonly id: number;
}