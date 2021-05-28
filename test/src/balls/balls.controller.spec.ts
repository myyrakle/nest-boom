import { Test, TestingModule } from '@nestjs/testing';
import { BallsController } from './balls.controller';
import { BallsService } from './balls.service';

describe('BallsController', () => {
  let controller: BallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BallsController],
      providers: [BallsService],
    }).compile();

    controller = module.get<BallsController>(BallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
