import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ControllerResponse } from 'src/types/interfaces';
import { Payment } from './entities/payment.entity';

@Controller('pagos')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  
  @Post(":paymentId/revertir/")
  async revert(@Param() paymentId: string): Promise<ControllerResponse<Payment>> {
    const _payment = await this.paymentService.revert(paymentId);

    return {
      success: true,
      code: 201,
      res: _payment
    }
  }
}
