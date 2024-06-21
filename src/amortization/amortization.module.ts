import { Module } from '@nestjs/common';
import { AmortizationService } from './amortization.service';
import { AmortizationController } from './amortization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amortization } from './entities/amortization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amortization])],
  controllers: [AmortizationController],
  providers: [AmortizationService],
  exports: [AmortizationService]
})
export class AmortizationModule {}
