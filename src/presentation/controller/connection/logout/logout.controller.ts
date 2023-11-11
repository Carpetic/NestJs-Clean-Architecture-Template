import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LogoutUseCase } from 'src/application/usecases/connection/logout/logout';
import { LogoutRequestDTO } from 'src/application/usecases/connection/logout/logout-request.dto';

@Controller('user/logout')
export class LogoutController {
    constructor(private readonly logoutUserUseCase: LogoutUseCase) { }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Body() data: LogoutRequestDTO): Promise<void> {
        await this.logoutUserUseCase.execute(data);
    }
}
