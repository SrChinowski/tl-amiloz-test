import { IsString, IsNotEmpty, IsNumber, IsDate, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Loan } from 'src/loan/entities/loan.entity';

export class CreateAmortizationDto {

  @ApiProperty({ description: 'Monto del prestamo' })
  @IsNumber()
  @IsNotEmpty()
  loan_amount: number;

  @ApiProperty({ description: 'Intereses del credito' })
  @IsNumber()
  @IsNotEmpty()
  interes: number;

  @ApiProperty({ description: 'Numero de Semanas' })
  @IsNumber()
  @IsNotEmpty()
  weeks_amount: number;

  @ApiProperty({ description: 'Id del credito' })
  @IsObject()
  @IsNotEmpty()
  loan: Loan;


}
