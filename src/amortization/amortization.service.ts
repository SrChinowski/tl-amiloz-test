import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAmortizationDto } from './dto/create-amortization.dto';
import { Amortization } from './entities/amortization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AmortizationService {

  constructor(
    @InjectRepository(Amortization)
    private amortizacionRepository: Repository<Amortization>,
  ){}

  async createAmortization(createAmortizationDto: CreateAmortizationDto) : Promise<Amortization[]> {
    const {loan_amount, interes, weeks_amount, loan} = createAmortizationDto;

    //Interes sobre saldos globales con periodicidad semanal
    const amortizations: Amortization[] = [];
    let saldo_global = loan_amount;
    const intereses_semanales = saldo_global * (interes / 100);
    const pago_capital = saldo_global / weeks_amount
    const pago_semanal = pago_capital + intereses_semanales

    for (let i = 1; i <= weeks_amount; i++) {
      saldo_global -= intereses_semanales - pago_capital;

      amortizations.push({
          no_pago: i,
          pago_capital,
          intereses_semanales,
          pago_semanal,
          payment_due_date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000), // Sumar una semana por cada periodo
          rest_amount: saldo_global > 0 ? saldo_global : 0, // Evita un saldo negativo en el último pago
          loan: loan
      } as any);
    }

    try {
      const amortizationEntities = this.amortizacionRepository.create(amortizations);
      return await this.amortizacionRepository.save(amortizationEntities);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create amortization schedule');
    }
  }
}
