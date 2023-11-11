export class ExceptionMessage {
    private _message: string;
    private _status: number;

    get message(): string {
        return this._message;
    }

    get status(): number {
        return this._status;
    }

    constructor(message: string, status?: number) {
        this._message = message;
        this._status = status || null;
    }
}