import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmortizationService } from './amortization.service';
import { CreateAmortizationDto } from './dto/create-amortization.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Tabla de amortizacion')

@Controller('amortization')
export class AmortizationController {
  constructor(private readonly amortizationService: AmortizationService) {}

  @Post()
  create(@Body() createAmortizationDto: CreateAmortizationDto) {
    return this.amortizationService.createAmortization(createAmortizationDto);
  }
}
