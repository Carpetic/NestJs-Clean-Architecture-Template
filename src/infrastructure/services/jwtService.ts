import { IJWTService } from "src/application/interface/services/jwtService.interface";
import { UserWithoutPassword } from "src/domain/entities/User";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export class JWTService implements IJWTService {
    async generate(user: UserWithoutPassword, expire_at: number): Promise<string> {
        const token = await jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: expire_at + 'h' })
        return token;
    }

    async verify(token: string): Promise<any> {
        return await jwt.verify(token, process.env.JWT_SECRET);
    }

    async isExpired(token: string): Promise<boolean> {
        try {
            await jwt.verify(token, process.env.JWT_SECRET);
            return false;
        } catch (error) {
            return true;
        }
    }
}