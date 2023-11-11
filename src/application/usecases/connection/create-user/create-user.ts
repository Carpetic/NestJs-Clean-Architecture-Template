import { ConflictException, Inject } from "@nestjs/common";
import { CreateUserRequestDTO } from "./create-user-request.dto";
import { CreateUserResponseDTO } from "./create-user-response.dto";
import { UserWithoutPassword, UserM } from "src/domain/entities/User";
import { IUserRepository } from "src/application/interface/repositories/userRepository.interface";
import { IPasswordHasher } from "src/application/interface/services/passwordHasher.interface";
import { IJWTService } from "src/application/interface/services/jwtService.interface";
import { IException } from "src/application/interface/services/exception.interface";
import * as dotenv from 'dotenv';
import { IUserSessionRepository } from "src/application/interface/repositories/userSessionRepository.interface";

dotenv.config();

export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserSessionRepository') private readonly userSessionRepository: IUserSessionRepository,
        @Inject('IPasswordHasher') private readonly passwordHasher: IPasswordHasher,
        @Inject('IJWTService') private readonly jwtService: IJWTService,
        @Inject('IException') private readonly exception: IException,
    ) { }

    async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        const { name, email, password } = data;

        const userAlreadyExists = await this.userRepository.findUserByEmail(email);

        if (userAlreadyExists) {
            this.exception.ConflictException("User already exists");
        }

        const hashedPassword = await this.passwordHasher.hash(password);
        const user = new UserM(name, email, hashedPassword, null);
        const saved_user = await this.userRepository.save(user);

        const jwt_token = await this.generateToken(saved_user);
        const userSession = await this.userSessionRepository.save(user.id, jwt_token);

        return new CreateUserResponseDTO(saved_user, userSession.token);
    }

    async generateToken(user: UserWithoutPassword): Promise<string> {
        const token = await this.jwtService.generate(user, +process.env.JWT_VALIDITY * 24);

        return token;

    }
}
