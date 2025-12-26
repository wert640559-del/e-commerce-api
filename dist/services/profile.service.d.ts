import type { Prisma, Profile, User } from "../generated/client";
import type { IProfileRepository } from "../repositories/profile.repository";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        gender?: string;
    };
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
interface ProfileListResponse {
    profiles: Profile[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IProfileService {
    list(params: FindAllParams): Promise<ProfileListResponse>;
    getById(id: string): Promise<User | null & Profile | null>;
    getByUserId(userId: number): Promise<Profile>;
    create(data: {
        name: string;
        gender: string;
        address: string;
        user_id: number;
        profile_picture_url?: string;
    }): Promise<Profile>;
    update(id: string, data: Partial<Profile>): Promise<Profile>;
    delete(id: string): Promise<Profile>;
    exec(): Promise<{
        byGender: any;
    }>;
    getMyProfile(userId: number): Promise<Profile>;
}
export declare class ProfileService implements IProfileService {
    private profileRepo;
    constructor(profileRepo: IProfileRepository);
    list(params: FindAllParams): Promise<ProfileListResponse>;
    getById(id: string): Promise<User | null & Profile | null>;
    getByUserId(userId: number): Promise<Profile>;
    getMyProfile(userId: number): Promise<Profile>;
    upsertMyProfile(userId: number, data: any): Promise<Profile>;
    create(data: {
        name: string;
        gender: string;
        address: string;
        user_id: number;
        profile_picture_url?: string;
    }): Promise<Profile>;
    update(id: string, data: Partial<Profile>): Promise<Profile>;
    delete(id: string): Promise<Profile>;
    exec(): Promise<{
        byGender: (Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "gender"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=profile.service.d.ts.map