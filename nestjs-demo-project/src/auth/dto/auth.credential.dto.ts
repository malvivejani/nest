import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AuthCredentialDTO {

    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}