import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { UserOfferModule } from 'src/user_offer/user_offer.module';
import { UserOffer } from 'src/user_offer/entities/user_offer.entity';
import { OfferModule } from 'src/offer/offer.module';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserOffer]), 
    forwardRef(() => ProfileModule),
    forwardRef(() => OfferModule),
    forwardRef(() => UserOfferModule),
    forwardRef(() => LoanModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
