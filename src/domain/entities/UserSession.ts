import { UserWithoutPassword } from "./User";

export class UserSession {
    private _id: number | null;
    private _user: UserWithoutPassword;
    private _token: string;

    get id(): number | null {
        return this._id;
    }

    get user(): UserWithoutPassword {
        return this._user;
    }

    get token(): string {
        return this._token;
    }

    constructor(user: UserWithoutPassword, token: string, id?: number) {
        this._user = user;
        this._token = token;
        this._id = id || null;
    }
}