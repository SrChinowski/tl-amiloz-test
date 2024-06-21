import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOfferService } from 'src/user_offer/user_offer.service';
import { AmortizationService } from 'src/amortization/amortization.service';

@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    private userOfferService: UserOfferService,
    private amortizationService: AmortizationService,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const {id_user_offer, amount} = createLoanDto;

    try {
      //Obtener datos de la oferta
      const {offer} = await this.userOfferService.getOfferFromUserOfferId(id_user_offer);

      //Validar el monto no exceda el maximo de la oferta
      if(amount > offer.max_amount){
        throw new Error('El monto excede el maximo de la oferta');
      }

      //crear credito
      const _loan = this.loanRepository.create({
        user_offer: offer,
        amount: amount
      })

      //Creamos Tabla de Amortizacion
      const amortization = await this.amortizationService.createAmortization({
        loan_amount :amount, 
        interes : offer.interes, 
        weeks_amount : offer.weeks_amount,
        loan: _loan
      });

      console.log(amortization);

      return _loan;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Error creating loan")
    }
  }
}
