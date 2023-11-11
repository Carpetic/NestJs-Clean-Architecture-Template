import { Inject, Injectable } from "@nestjs/common";
import { IUserSessionRepository } from "src/application/interface/repositories/userSessionRepository.interface";
import { UserORMEntity } from "../ORM/entities/UserORMEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserSessionORMEntity } from "../ORM/entities/UserSessionORMEntity";
import { UserWithoutPassword } from "src/domain/entities/User";
import { UserSession } from "src/domain/entities/UserSession";
import { IException } from "src/application/interface/services/exception.interface";
import { IJWTService } from "src/application/interface/services/jwtService.interface";

@Injectable()
export class TypeORMUserSessionRepository implements IUserSessionRepository {
    constructor(
        @InjectRepository(UserORMEntity)
        private readonly userRepository: Repository<UserORMEntity>,
        @InjectRepository(UserSessionORMEntity)
        private readonly repository: Repository<UserSessionORMEntity>,
        @Inject('IException')
        private readonly exception: IException,
        @Inject('IJWTService')
        private readonly jwtService: IJWTService,

    ) { }

    async findUserSessionByUserId(user_id: number): Promise<UserSession[]> {
        const userSessionEntities = await this.repository.find({ where: { user: { user_id: user_id } }, relations: ['user'] });

        let user: UserWithoutPassword;
        if (userSessionEntities.length > 0) {
            user = new UserWithoutPassword(userSessionEntities[0].user.name, userSessionEntities[0].user.email, userSessionEntities[0].user.user_id);
        }

        const userSession = userSessionEntities.map((userSessionEntity) => {
            return new UserSession(user, userSessionEntity.token, userSessionEntity.user_session_id);
        });

        return userSession
            ? userSession
            : null;
    }

    async findUserSessionByToken(token: string): Promise<UserSession> {
        const userSession = await this.repository.findOne({ where: { token }, relations: ['user'] });

        if (!userSession) {
            return null
        }

        const user = new UserWithoutPassword(userSession.user.name, userSession.user.email, userSession.user.user_id);

        return userSession
            ? new UserSession(user, userSession.token)
            : null;
    }

    async recycle(user_id: number): Promise<void> {
        const userSessionEntities = await this.repository.find({ where: { user: { user_id: user_id } }, relations: ['user'] });

        userSessionEntities.forEach(async (userSessionEntity) => {
            await this.jwtService.isExpired(userSessionEntity.token) ? this.repository.remove(userSessionEntity) : null;
        });
    }

    async save(user_id: number, token: string): Promise<UserSession> {
        const userData = await this.userRepository.findOne({ where: { user_id: user_id } });

        const userSessionEntity = this.repository.create({
            user: userData,
            token: token,
        });

        const savedUserSession = await this.repository.save(userSessionEntity);

        const user = new UserWithoutPassword(userData.name, userData.email, userData.user_id);

        return savedUserSession
            ? new UserSession(user, token)
            : null;
    }

    async update(user_session_id: number, token: string): Promise<UserSession> {
        const userSessionEntity = await this.repository.findOne({
            where: { user_session_id },
            relations: ['user'],
        });

        if (!userSessionEntity) {
            this.exception.BadRequestException("User session not found");
        }
        const user = new UserWithoutPassword(userSessionEntity.user.name, userSessionEntity.user.email, userSessionEntity.user.user_id);

        userSessionEntity.token = token;

        const savedUserSession = await this.repository.save(userSessionEntity);

        return savedUserSession
            ? new UserSession(user, token)
            : null;
    }

    async remove(userSession: UserSession): Promise<void> {
        const userSessionEntity = await this.repository.findOne({
            where: { token: userSession.token },
        });

        if (!userSessionEntity) {
            this.exception.BadRequestException("User session not found");
        }

        await this.repository.remove(userSessionEntity);
    }

}