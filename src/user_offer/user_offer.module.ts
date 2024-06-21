import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from '../offer/entities/offer.entity';
import { User } from '../user/entities/user.entity';
import { UserOffer } from './entities/user_offer.entity';
import { UserOfferService } from './user_offer.service';
import { UserOfferController } from './user_offer.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOffer, Offer]),
    forwardRef(() => UserModule),
  ],
  providers: [UserOfferService],
  controllers: [UserOfferController],
  exports: [UserOfferService],
})
export class UserOfferModule {} 
