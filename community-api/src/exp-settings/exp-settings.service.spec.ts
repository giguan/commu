import { Test, TestingModule } from '@nestjs/testing';
import { ExpSettingsService } from './exp-settings.service';

describe('ExpSettingsService', () => {
  let service: ExpSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpSettingsService],
    }).compile();

    service = module.get<ExpSettingsService>(ExpSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
