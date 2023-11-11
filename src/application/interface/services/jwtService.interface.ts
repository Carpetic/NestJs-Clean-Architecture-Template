import { UserWithoutPassword } from "src/domain/entities/User"

export interface IJWTService {
    generate(user: UserWithoutPassword, expire_at: number): Promise<string>
    verify(token: string): Promise<any>
    isExpired(token: string): Promise<boolean>
}
