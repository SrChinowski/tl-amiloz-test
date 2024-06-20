import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ description: 'Nombre de la oferta' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Puntuación mínima requerida' })
  @IsNumber()
  min_score: number;

  @ApiProperty({ description: 'Cantidad de semanas' })
  @IsNumber()
  weeks_amount: number;

  @ApiProperty({ description: 'Monto máximo' })
  @IsNumber()
  max_amount: number;

  @ApiProperty({ description: 'Interés' })
  @IsNumber()
  interes: number;
}