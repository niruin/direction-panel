import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {IPartnerLogDetails, PartnerLogDetails} from './models/partner-log-details.model';
import {PartnerLogDetailsResponse} from './interfaces/partner-log-details.interface';

@Injectable()
export class PartnerLogDetailsService {
  constructor(
    @InjectModel(PartnerLogDetails)
    private partnerLogDetailsModel: typeof PartnerLogDetails,
  ) {
  }

  async findOne(id: string):  Promise<PartnerLogDetailsResponse> {
    const response = await this.partnerLogDetailsModel.findOne({
      where: {
        partnerLogId: Number(id),
      },
    });

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: ['Данные получены'],
      data: response.dataValues
    }
  }

  create(beforeUpdateUser, afterUpdateUser, idLog: number) {
    const data: IPartnerLogDetails = {
      prevPartnerName: beforeUpdateUser.partnerName,
      prevUrlPanel: beforeUpdateUser.urlPanel,
      prevCurrency: beforeUpdateUser.currency,
      prevFeeRate: beforeUpdateUser.feeRate,
      prevRateBTCID: beforeUpdateUser.rateBTCID,
      prevRateUSDTID: beforeUpdateUser.rateUSDTID,
      prevBotLimit: beforeUpdateUser.botLimit,
      prevCountBotLimit: beforeUpdateUser.countBotLimit,
      prevTariffPlan: beforeUpdateUser.countBotLimit,
      partnerName: afterUpdateUser.partnerName,
      urlPanel: afterUpdateUser.urlPanel,
      currency: afterUpdateUser.currency,
      feeRate: afterUpdateUser.feeRate,
      rateBTCID: afterUpdateUser.rateBTCID,
      rateUSDTID: afterUpdateUser.rateUSDTID,
      botLimit: afterUpdateUser.botLimit,
      countBotLimit: afterUpdateUser.countBotLimit,
      tariffPlan: afterUpdateUser.tariffPlan,
      partnerLogId: idLog,
    }
    this.partnerLogDetailsModel.create({...data});
  }
}