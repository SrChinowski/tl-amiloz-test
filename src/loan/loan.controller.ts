import { Controller, Post, Body, Param, } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreatePaymentDTO } from './dto/create-payment';
import { ControllerResponse } from 'src/types/interfaces';
import { Payment } from 'src/payment/entities/payment.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Prestamos')

@Controller('prestamos')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post(":loanId/pagos/")
  async createPayment(
    @Param('loanId') loanId: string,
    @Body() createPaymentDTO: CreatePaymentDTO
  ): Promise<ControllerResponse<Payment>>{
    
    const { payment_amount } = createPaymentDTO

    return {
      success: true,
      code: 201,
      res: await this.loanService.createPayment(payment_amount, loanId)
    }
  }
}