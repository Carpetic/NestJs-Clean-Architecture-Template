export class Login { }
import { Inject } from "@nestjs/common";
import { UserWithoutPassword } from "src/domain/entities/User";
import { IUserRepository } from "src/application/interface/repositories/userRepository.interface";
import { IPasswordHasher } from "src/application/interface/services/passwordHasher.interface";
import { IJWTService } from "src/application/interface/services/jwtService.interface";
import { IException } from "src/application/interface/services/exception.interface";
import * as dotenv from 'dotenv';
import { LoginRequestDTO } from "./login-request.dto";
import { LoginResponseDTO } from "./login-response.dto";
import { IUserSessionRepository } from "src/application/interface/repositories/userSessionRepository.interface";

dotenv.config();

export class LoginUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserSessionRepository') private readonly userSessionRepository: IUserSessionRepository,
        @Inject('IPasswordHasher') private readonly passwordHasher: IPasswordHasher,
        @Inject('IJWTService') private readonly jwtService: IJWTService,
        @Inject('IException') private readonly exception: IException,
    ) { }

    async execute(data: LoginRequestDTO): Promise<LoginResponseDTO> {
        const { email, password, remember } = data;

        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            this.exception.UnauthorizedException();
        }

        const passwordMatch = await this.passwordHasher.compare(password, user.password);

        if (!passwordMatch) {
            this.exception.UnauthorizedException();
        }

        const jwt_token = await this.generateToken(user, remember);
        await this.userSessionRepository.recycle(user.id);
        const userSession = await this.userSessionRepository.save(user.id, jwt_token);

        return new LoginResponseDTO(user, userSession.token);
    }

    async generateToken(user: UserWithoutPassword, remember: boolean): Promise<string> {
        let token: string;

        if (remember) {
            token = await this.jwtService.generate(user, +process.env.JWT_REMEMBER_VALIDITY * 24);
        } else {
            token = await this.jwtService.generate(user, +process.env.JWT_VALIDITY * 24);
        }

        return token;

    }
}
