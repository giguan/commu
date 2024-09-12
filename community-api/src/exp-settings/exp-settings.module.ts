import { Module } from '@nestjs/common';
import { ExpSettingsController } from './exp-settings.controller';
import { ExpSettingsService } from './exp-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpRewardSettings } from '@entities/ExpRewardSettings';

@Module({
  imports: [TypeOrmModule.forFeature([ExpRewardSettings])],
  controllers: [ExpSettingsController],
  providers: [ExpSettingsService],
})
export class ExpSettingsModule {}
