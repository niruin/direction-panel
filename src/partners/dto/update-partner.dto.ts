import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsOptional} from 'class-validator';

import {CreatePartnerDto, ICreatePartner} from './create-partner.dto';

export class UpdatePartnerDto extends CreatePartnerDto implements ICreatePartner {
  @ApiProperty({example: 1})
  @IsNumber()
  readonly partnerid: number;

  @IsNumber()
  @IsOptional()
  readonly fiatBalance?: number;
}