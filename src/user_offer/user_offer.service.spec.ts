import { Test, TestingModule } from '@nestjs/testing';
import { UserOfferService } from './user_offer.service';

describe('UserOfferService', () => {
  let service: UserOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOfferService],
    }).compile();

    service = module.get<UserOfferService>(UserOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
