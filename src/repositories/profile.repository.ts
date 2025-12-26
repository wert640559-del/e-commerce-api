import type { Prisma, PrismaClient, Profile, User } from "../generated/client";

export interface IProfileRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.ProfileWhereInput,
        orderBy: Prisma.ProfileOrderByWithRelationInput
    ): Promise<Profile[]>;
    countAll(where: Prisma.ProfileWhereInput): Promise<number>;
    findById(id: number): Promise<User | null & Profile | null>;
    findByUserId(userId: number): Promise<Profile | null>;
    create(data: Prisma.ProfileCreateInput): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    softDelete(id: number): Promise<Profile>;
    // Statistik berdasarkan gender (contoh kueri kompleks)
    getGenderStats(): Promise<(Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "gender"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}

export class ProfileRepository implements IProfileRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.ProfileWhereInput,
        orderBy: Prisma.ProfileOrderByWithRelationInput
    ): Promise<Profile[]> {
        return await this.prisma.profile.findMany({
            skip,
            take,
            where: {
                ...where,
                deletedAt: null
            },
            orderBy,
            include: { user: true }
        });
    }

    async countAll(where: Prisma.ProfileWhereInput): Promise<number> {
        return await this.prisma.profile.count({
            where: {
                ...where,
                deletedAt: null
            }
        });
    }

    async findById(id: number): Promise<User | null & Profile | null> {
        return await this.prisma.profile.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                user: true
            }
        }) as any; // Cast ke any karena intersection type manual sesuai style ProductRepo kamu
    }

    async findByUserId(userId: number): Promise<Profile | null> {
        return await this.prisma.profile.findUnique({
            where: { 
                user_id: userId,
                deletedAt: null 
            }
        });
    }

    async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
        return await this.prisma.profile.create({ 
            data: data 
        });
    }

    async update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile> {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }

    async softDelete(id: number): Promise<Profile> {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }

    async getGenderStats() {
        return await this.prisma.profile.groupBy({
            by: ['gender'],
            where: { deletedAt: null },
            _count: { id: true }
        });
    }
}