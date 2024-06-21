import { Module, forwardRef } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { UserOfferModule } from 'src/user_offer/user_offer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { AmortizationModule } from 'src/amortization/amortization.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    forwardRef(() => AmortizationModule),
    forwardRef(() => UserOfferModule),
    forwardRef(() => PaymentModule),
  ],
  controllers: [LoanController],
  providers: [LoanService],
  exports: [LoanService]
})
export class LoanModule {}
