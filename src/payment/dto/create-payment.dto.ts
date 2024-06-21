import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Amortization } from "src/amortization/entities/amortization.entity";
import { Loan } from "src/loan/entities/loan.entity";

export class CreatePaymentDto {
    @ApiProperty({ description: 'Id del pago a amortizacion' })
    @IsObject()
    @IsNotEmpty()
    amortizacion: Amortization;
  
    @ApiProperty({ description: 'Esta revertido' })
    @IsNumber()
    @IsNotEmpty()
    reverted: boolean;
  
    @ApiProperty({ description: 'Monto del Pago' })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
  
    @ApiProperty({ description: 'Id del credito' })
    @IsObject()
    @IsNotEmpty()
    loan: Loan;
}
