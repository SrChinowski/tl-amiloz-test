import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { UserRoles } from 'src/types/interfaces';

export class CreateUserDto {

  @IsEnum(UserRoles)
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  pass: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}