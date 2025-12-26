import type { User, Prisma, PrismaClient } from "../generated/client";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findById(id: number): Promise<User | null>;
}

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { 
                email 
            }
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({ 
            data 
        });
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id,
                // Jika user menggunakan soft delete, tambahkan: deletedAt: null
            }
        });
    }
}