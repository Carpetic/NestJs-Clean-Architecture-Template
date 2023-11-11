import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/usecases/connection/create-user/create-user';
import { CreateUserRequestDTO } from 'src/application/usecases/connection/create-user/create-user-request.dto';
import { CreateUserResponseDTO } from 'src/application/usecases/connection/create-user/create-user-response.dto';

@Controller('user/register')
export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post()
    async create(@Body() data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        const response = await this.createUserUseCase.execute(data);

        return response;
    }
}
