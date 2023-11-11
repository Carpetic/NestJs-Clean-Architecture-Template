import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWithoutPassword, UserM } from 'src/domain/entities/User';
import { UserORMEntity } from 'src/infrastructure/ORM/entities/UserORMEntity';
import { IUserRepository } from 'src/application/interface/repositories/userRepository.interface';
import { IException } from 'src/application/interface/services/exception.interface';

@Injectable()
export class TypeORMUserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserORMEntity)
        private readonly repository: Repository<UserORMEntity>,
        @Inject('IException')
        private readonly exception: IException,
    ) { }

    async findUserById(user_id: number): Promise<UserWithoutPassword | null> {
        const user = await this.repository.findOne({ where: { user_id } });
        return user
            ? new UserWithoutPassword(user.name, user.email, user.user_id)
            : null;
    }

    async findUserByEmail(email: string): Promise<UserM> {
        const user = await this.repository.findOne({ where: { email } });
        return user
            ? new UserM(user.name, user.email, user.password, user.reset_password, user.user_id,)
            : null;
    }

    async findUserByResetPassword(reset_password: string): Promise<UserWithoutPassword> {
        const user = await this.repository.findOne({ where: { reset_password } });
        return user
            ? new UserWithoutPassword(user.name, user.email, user.user_id)
            : null;
    }

    async save(user: UserM): Promise<UserWithoutPassword> {
        const userEntity = this.repository.create({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        const savedUser = await this.repository.save(userEntity);

        return new UserWithoutPassword(
            savedUser.name,
            savedUser.email,
            savedUser.user_id,
        );
    }

    async update(user: UserM): Promise<UserWithoutPassword> {
        const userEntity = await this.repository.findOne({
            where: { user_id: user.id },
        });

        if (!userEntity) {
            this.exception.BadRequestException('User not found');
        }

        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;

        const updatedUser = await this.repository.save(userEntity);

        return new UserWithoutPassword(
            updatedUser.name,
            updatedUser.email,
            updatedUser.user_id,
        );
    }

    async remove(user: UserWithoutPassword): Promise<void> {
        const userEntity = await this.repository.findOne({
            where: { user_id: user.id },
        });

        if (!userEntity) {
            this.exception.BadRequestException('User not found');
        }

        await this.repository.remove(userEntity);
    }
}
