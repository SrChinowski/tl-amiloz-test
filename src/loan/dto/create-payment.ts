import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDTO {

    @ApiProperty({ description: 'Monto del prestamo' })
    @IsNumber()
    @IsNotEmpty()
    payment_amount: number;
}
