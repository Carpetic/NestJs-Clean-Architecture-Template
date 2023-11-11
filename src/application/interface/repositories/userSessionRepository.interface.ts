import { UserSession } from "src/domain/entities/UserSession";

export interface IUserSessionRepository {
    findUserSessionByUserId(user_id: number): Promise<UserSession[] | null>;

    findUserSessionByToken(token: string): Promise<UserSession | null>;

    recycle(user_id: number): Promise<void>;

    save(user_id: number, token: string): Promise<UserSession>;

    update(userSession: number, token: string): Promise<UserSession>;

    remove(userSession: UserSession): Promise<void>;
}