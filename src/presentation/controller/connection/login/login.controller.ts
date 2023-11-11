import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/application/usecases/connection/login/login';
import { LoginRequestDTO } from 'src/application/usecases/connection/login/login-request.dto';
import { LoginResponseDTO } from 'src/application/usecases/connection/login/login-response.dto';

@Controller('user/login')
export class LoginController {
    constructor(private readonly loginUserUseCase: LoginUseCase) { }

    @Post()
    async login(@Body() data: LoginRequestDTO): Promise<LoginResponseDTO> {
        const response = await this.loginUserUseCase.execute(data);

        return response;
    }
}
