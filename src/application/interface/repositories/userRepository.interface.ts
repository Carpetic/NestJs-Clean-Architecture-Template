import { UserWithoutPassword, UserM } from 'src/domain/entities/User';

export interface IUserRepository {
    findUserById(id: number): Promise<UserWithoutPassword | null>;

    findUserByEmail(email: string): Promise<UserM | null>;

    findUserByResetPassword(reset_password: string): Promise<UserWithoutPassword | null>;

    save(user: UserM): Promise<UserWithoutPassword>;

    update(user: UserM): Promise<UserWithoutPassword>;

    remove(user: UserM): Promise<void>;
}
