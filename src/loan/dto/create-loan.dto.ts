import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty({ description: 'ID de la oferta de usuario' })
  @IsString()
  @IsNotEmpty()
  id_user_offer: string;

  @ApiProperty({ description: 'Monto del credito' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
