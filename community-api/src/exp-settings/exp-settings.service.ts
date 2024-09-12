import { ExpRewardSettings } from '@entities/ExpRewardSettings';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpSettingsService {
  constructor(
    @InjectRepository(ExpRewardSettings)
    private expRewardSettingsRepository: Repository<ExpRewardSettings>,
  ) {}

  getExpSettings() {
    return this.expRewardSettingsRepository.findOne({
      where: { id: 1 },
    });
  }
}
