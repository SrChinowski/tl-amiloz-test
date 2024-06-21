import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmortizationService } from 'src/amortization/amortization.service';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private amortizationService: AmortizationService
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.create({
        amortization: createPaymentDto.amortizacion,
        amount: createPaymentDto.amount,
        reverted: false
      });
      return await this.paymentRepository.save(payment);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("No se pudo registrar el pago");
    }
  }

  async findPaymentById(idPayment: string): Promise<Payment> {
    const _pay = await this.paymentRepository.findOneBy({ id: idPayment });

    if(!_pay) {
      throw new InternalServerErrorException("No se encontro el pago");
    }

    return _pay
  }

  async revert(idPayment: string): Promise<Payment> {

    //Validamos el pago
    const _pay = await this.findPaymentById(idPayment);

    //Buscamos la amortizacion donde se aplico 
    const { amortization } = _pay;

    //Si el credito esta saldado no aplica
    if(amortization.loan.pagado) 
      throw new InternalServerErrorException("El credito ya no está activo");

    //Revertimos el pago
    _pay.reverted = false

    //Guardamos cambios
    await this.paymentRepository.update(_pay.id, {reverted: true});
    await this.amortizationService.update(amortization.id, {pagado: false});

    return _pay 
  }
}
