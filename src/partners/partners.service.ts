import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePartnerDto } from './dto/create-partner.dto';
import { Partner } from './models/partner.model';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner)
    private readonly userModel: typeof Partner,
  ) {}

  create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    return this.userModel.create({
      partnerName: createPartnerDto.partnerName,
      urlPanel: createPartnerDto.urlPanel,
    });
  }

  async findAll(): Promise<Partner[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<Partner> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
