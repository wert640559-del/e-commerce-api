import type { User, Prisma } from "../generated/client.js";
import type { IAuthRepository } from "../repositories/auth.repository.js";
interface AuthResponse {
    user: Omit<User, "password_hash">;
    token: string;
}
export interface IAuthService {
    register(data: Prisma.UserCreateInput): Promise<Omit<User, "password_hash">>;
    login(email: string, password: string): Promise<AuthResponse>;
    me(userId: number): Promise<Omit<User, "password_hash">>;
}
export declare class AuthService implements IAuthService {
    private authRepo;
    constructor(authRepo: IAuthRepository);
    register(data: Prisma.UserCreateInput): Promise<Omit<User, "password_hash">>;
    login(email: string, password: string): Promise<AuthResponse>;
    me(userId: number): Promise<Omit<User, "password_hash">>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map
