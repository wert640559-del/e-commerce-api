import type { Prisma, PrismaClient, Profile, User } from "../generated/client.js";
export interface IProfileRepository {
    list(skip: number, take: number, where: Prisma.ProfileWhereInput, orderBy: Prisma.ProfileOrderByWithRelationInput): Promise<Profile[]>;
    countAll(where: Prisma.ProfileWhereInput): Promise<number>;
    findById(id: number): Promise<User | null & Profile | null>;
    findByUserId(userId: number): Promise<Profile | null>;
    create(data: Prisma.ProfileCreateInput): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    softDelete(id: number): Promise<Profile>;
    getGenderStats(): Promise<(Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "gender"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
export declare class ProfileRepository implements IProfileRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.ProfileWhereInput, orderBy: Prisma.ProfileOrderByWithRelationInput): Promise<Profile[]>;
    countAll(where: Prisma.ProfileWhereInput): Promise<number>;
    findById(id: number): Promise<User | null & Profile | null>;
    findByUserId(userId: number): Promise<Profile | null>;
    create(data: Prisma.ProfileCreateInput): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    softDelete(id: number): Promise<Profile>;
    getGenderStats(): Promise<(Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "gender"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=profile.repository.d.ts.map
