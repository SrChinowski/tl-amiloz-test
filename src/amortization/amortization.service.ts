import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAmortizationDto } from './dto/create-amortization.dto';
import { Amortization } from './entities/amortization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from 'src/loan/entities/loan.entity';

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
      saldo_global = (saldo_global + intereses_semanales) - pago_semanal;

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

  async getFirstPayment(_loan: Loan) : Promise<Amortization> {

    const _res = await this.amortizacionRepository.findOne({
      where: {
        loan: { id: _loan.id },
        pagado: false
      },
      order: {
        no_pago: 'ASC'
      }
    });
    if(!_res){
      throw new InternalServerErrorException('Failed to get first payment');
    }

    return _res
  }

  async applyPayment(_amortization: Amortization) : Promise<Amortization> {
    _amortization.pagado = true;
    try {
      return await this.amortizacionRepository.save(_amortization);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to apply payment');
    }
  }

  async update(_id: string, _data: any) : Promise<Amortization> {
    try {
      await this.amortizacionRepository.update(_id, _data);
      return await this.amortizacionRepository.findOne({
        where: {
          id: _id
        }
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update amortization');
    }
  }
}
