import { UserWithoutPassword } from "src/domain/entities/User";

export class CreateUserResponseDTO {
    user_id: number;
    name: string;
    email: string;
    token: string;

    constructor(user: UserWithoutPassword, token: string) {
        this.user_id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.token = token;
    }
}