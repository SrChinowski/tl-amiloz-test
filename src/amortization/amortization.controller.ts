import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmortizationService } from './amortization.service';
import { CreateAmortizationDto } from './dto/create-amortization.dto';

@Controller('amortization')
export class AmortizationController {
  constructor(private readonly amortizationService: AmortizationService) {}

  @Post()
  create(@Body() createAmortizationDto: CreateAmortizationDto) {
    return this.amortizationService.createAmortization(createAmortizationDto);
  }
}
