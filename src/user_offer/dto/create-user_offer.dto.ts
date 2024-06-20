import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserOfferDto {
  @ApiProperty({ description: 'ID de la oferta' })
  @IsString()
  @IsNotEmpty()
  id_offer: string;

  @ApiProperty({ description: 'ID del usuario' })
  @IsString()
  @IsNotEmpty()
  id_user: string;
}
