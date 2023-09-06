import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {IPartnerLogDetailsModel, PartnerLogDetails} from './models/partner-log-details.model';

@Injectable()
export class PartnerLogDetailsService {
  constructor(
    @InjectModel(PartnerLogDetails)
    private partnerLogDetailsModel: typeof PartnerLogDetails,
  ) {
  }

  findOne(id: string) {
    return this.partnerLogDetailsModel.findOne({
      where: {
        id,
      },
    });
  }

  create(beforeUpdateUser, afterUpdateUser) {
    const data: IPartnerLogDetailsModel = {
      prevPartnerName: beforeUpdateUser.partnerName,
      prevUrlPanel: beforeUpdateUser.urlPanel,
      prevCurrency: beforeUpdateUser.currency,
      prevFreeRate: beforeUpdateUser.freeRate,
      prevRateBTCID: beforeUpdateUser.rateBTCID,
      prevRateUSDTID: beforeUpdateUser.rateUSDTID,
      prevBotLimit: beforeUpdateUser.botLimit,
      prevCountBotLimit: beforeUpdateUser.countBotLimit,
      partnerName: afterUpdateUser.partnerName,
      urlPanel: afterUpdateUser.urlPanel,
      currency: afterUpdateUser.currency,
      freeRate: afterUpdateUser.freeRate,
      rateBTCID: afterUpdateUser.rateBTCID,
      rateUSDTID: afterUpdateUser.rateUSDTID,
      botLimit: afterUpdateUser.botLimit,
      countBotLimit: afterUpdateUser.countBotLimit,
    }
    const response = this.partnerLogDetailsModel.create({...data});
  }
}