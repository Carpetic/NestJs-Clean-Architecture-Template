import { IPasswordHasher } from "src/application/interface/services/passwordHasher.interface";
import * as bcrypt from "bcrypt";

export class PasswordHasher implements IPasswordHasher {
    async hash(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, 12);
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }
}
