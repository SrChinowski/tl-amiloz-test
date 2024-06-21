import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOfferService } from 'src/user_offer/user_offer.service';
import { AmortizationService } from 'src/amortization/amortization.service';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    private userOfferService: UserOfferService,
    private amortizationService: AmortizationService,
    private paymentsService: PaymentService,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<any> {
    const {id_user_offer, amount} = createLoanDto;

    try {
      //Obtener datos de la oferta
      const userOffer = await this.userOfferService.getOfferFromUserOfferId(id_user_offer);

      //Validar el monto no exceda el maximo de la oferta
      if(amount > userOffer.offer.max_amount){
        throw new Error('El monto excede el maximo de la oferta');
      }

      //crear credito
      const _loan = await this.loanRepository.save({
        user_offer: userOffer,
        amount: amount
      })

      //Creamos Tabla de Amortizacion
      const amortization = await this.amortizationService.createAmortization({
        loan_amount :amount, 
        interes : userOffer.offer.interes, 
        weeks_amount : userOffer.offer.weeks_amount,
        loan: _loan
      });

      return {
        amortization: amortization,
        loan: _loan,
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Error creating loan")
    }
  }

  async getLoanById(id: string) : Promise<Loan> {
    const _loan = await this.loanRepository.findOne({
      where: {
        id: id
      }
    })
    
    if(!_loan)
      throw new InternalServerErrorException("No existe el credito solicitado")

    return _loan
  }

  async createPayment(payment_amount: number , id_loan: string): Promise<Payment> {

    //Revisemos que el credito es valido
    const _loan =  await this.getLoanById(id_loan);

    //Obtenemos el pago a aplicar 
    const _amortizacion =  await this.amortizationService.getFirstPayment(_loan);

    //Validamos el monto sea al menos mayor
    if(_amortizacion.pago_semanal > payment_amount){
      throw new InternalServerErrorException("El monto es menor al minimo");
    }

    //Aplicamos el pago
    await this.amortizationService.applyPayment(_amortizacion);

    //Registramos el pago
    const _payment = await this.paymentsService.create({
      amortizacion: _amortizacion,
      reverted: false,
      amount: payment_amount,
      loan: _loan
    })

    return _payment;
    
    }

}
