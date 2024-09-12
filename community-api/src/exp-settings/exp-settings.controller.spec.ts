import { Test, TestingModule } from '@nestjs/testing';
import { ExpSettingsController } from './exp-settings.controller';

describe('ExpSettingsController', () => {
  let controller: ExpSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpSettingsController],
    }).compile();

    controller = module.get<ExpSettingsController>(ExpSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
