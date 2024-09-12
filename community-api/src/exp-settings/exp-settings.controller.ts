import { Controller, Get } from '@nestjs/common';
import { ExpSettingsService } from './exp-settings.service';

@Controller('exp-settings')
export class ExpSettingsController {
  constructor(private expSettingsService: ExpSettingsService) {}

  @Get()
  async getExpSetting() {
    const res = await this.expSettingsService.getExpSettings();

    return res;
  }
}
