export class UserWithoutPassword {
    private _id: number | null;
    private _name: string;
    private _email: string;

    get id(): number | null {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    constructor(name: string, email: string, id?: number) {
        this._name = name;
        this._email = email;
        this._id = id || null;
    }
}

export class UserM extends UserWithoutPassword {
    private _password: string;
    private _reset_password: string;

    get password(): string {
        return this._password;
    }

    get reset_password(): string {
        return this._reset_password;
    }

    constructor(name: string, email: string, password: string, reset_password: string, id?: number | null) {
        super(name, email, id);
        this._password = password;
        this._reset_password = reset_password;
    }
}