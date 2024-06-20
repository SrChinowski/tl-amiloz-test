import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class authDTO {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}