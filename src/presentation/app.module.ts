import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/infrastructure/config/TypeORM.config';
import { UserORMEntity } from 'src/infrastructure/ORM/entities/UserORMEntity';
import { CreateUserController } from './controller/connection/create-user/create-user.controller';
import { JWTService } from 'src/infrastructure/services/jwtService';
import { PasswordHasher } from 'src/infrastructure/services/passwordHaser';
import { TypeORMUserRepository } from 'src/infrastructure/repositories/TypeORMUserRepository';
import { Exception } from 'src/infrastructure/services/exception';
import { LoginController } from './controller/connection/login/login.controller';
import { LoginUseCase } from 'src/application/usecases/connection/login/login';
import { CreateUserUseCase } from 'src/application/usecases/connection/create-user/create-user';
import { UserSessionORMEntity } from 'src/infrastructure/ORM/entities/UserSessionORMEntity';
import { TypeORMUserSessionRepository } from 'src/infrastructure/repositories/TypeORMUserSessionRepository';
import { LogoutController } from './controller/connection/logout/logout.controller';
import { LogoutUseCase } from 'src/application/usecases/connection/logout/logout';

@Module({
    imports: [
        TypeOrmModule.forRoot(TypeORMConfig),
        TypeOrmModule.forFeature([UserORMEntity, UserSessionORMEntity])
    ],
    controllers: [CreateUserController, LoginController, LogoutController],
    providers: [
        CreateUserUseCase,
        LoginUseCase,
        LogoutUseCase,
        {
            provide: 'IUserRepository',
            useClass: TypeORMUserRepository
        },
        {
            provide: 'IPasswordHasher',
            useClass: PasswordHasher,
        },
        {
            provide: 'IJWTService',
            useClass: JWTService,
        },
        {
            provide: 'IException',
            useClass: Exception,
        },
        {
            provide: 'IUserSessionRepository',
            useClass: TypeORMUserSessionRepository,
        },
    ],
})
export class AppModule { }
