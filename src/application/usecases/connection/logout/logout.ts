import { Inject } from "@nestjs/common";
import { IUserSessionRepository } from "src/application/interface/repositories/userSessionRepository.interface";
import { LogoutRequestDTO } from "./logout-request.dto";
import { IException } from "src/application/interface/services/exception.interface";

export class LogoutUseCase {
    constructor(
        @Inject('IUserSessionRepository') private readonly userSessionRepository: IUserSessionRepository,
        @Inject('IException') private readonly exception: IException,
    ) { }

    async execute(data: LogoutRequestDTO): Promise<void> {
        const { token } = data;

        const userSession = await this.userSessionRepository.findUserSessionByToken(token);

        if (!userSession) {
            this.exception.BadRequestException("Invalid token");
        }

        await this.userSessionRepository.remove(userSession);
    }

}
