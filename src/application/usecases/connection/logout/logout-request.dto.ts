import { IsNotEmpty, IsString } from "class-validator";

export class LogoutRequestDTO {
    @IsNotEmpty()
    @IsString()
    readonly token: string;
}