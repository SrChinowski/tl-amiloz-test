import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { UserRoles } from 'src/types/interfaces';

export class CreateUserDto {

  @ApiProperty({ description: 'Rol del usuario' })
  @IsEnum(UserRoles)
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ description: 'Score de crédito' })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty({ description: 'Correo del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  @IsNotEmpty()
  pass: string;

  @ApiProperty({ description: 'Información de perfil' })
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}

export class UserCreateLoanDto {
  @ApiProperty({ description: 'ID de la oferta' })
  @IsString()
  @IsNotEmpty()
  id_offer: string

  @ApiProperty({ description: 'Monto del crédito' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}