import type { User, Prisma, PrismaClient } from "../generated/client.js";
export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findById(id: number): Promise<User | null>;
}
export declare class AuthRepository implements IAuthRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findUserByEmail(email: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findById(id: number): Promise<User | null>;
}
//# sourceMappingURL=auth.repository.d.ts.map
