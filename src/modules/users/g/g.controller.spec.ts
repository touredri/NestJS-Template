import { Test, TestingModule } from '@nestjs/testing';
import { GController } from './g.controller';
import { GService } from './g.service';

describe('GController', () => {
  let controller: GController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GController],
      providers: [GService],
    }).compile();

    controller = module.get<GController>(GController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
