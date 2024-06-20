import { Test, TestingModule } from '@nestjs/testing';
import { UserOfferController } from './user_offer.controller';
import { UserOfferService } from './user_offer.service';

describe('UserOfferController', () => {
  let controller: UserOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOfferController],
      providers: [UserOfferService],
    }).compile();

    controller = module.get<UserOfferController>(UserOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
