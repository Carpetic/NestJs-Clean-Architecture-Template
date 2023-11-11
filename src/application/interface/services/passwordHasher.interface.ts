export interface IPasswordHasher {
    hash(plainPassword: string): Promise<string>;
    compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
