import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly remember: boolean;
}