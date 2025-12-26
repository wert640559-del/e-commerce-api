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
    create(data: { name: string; gender: string; address: string; user_id: number; profile_picture_url?: string }): Promise<Profile>;
    update(id: string, data: Partial<Profile>): Promise<Profile>;
    delete(id: string): Promise<Profile>;
    exec(): Promise<{ byGender: any }>;
    getMyProfile(userId: number): Promise<Profile>;
}

export class ProfileService implements IProfileService {
    constructor(private profileRepo: IProfileRepository) {}

    async list(params: FindAllParams): Promise<ProfileListResponse> {
        const { page, limit, search, sortBy, sortOrder } = params;

        const skip = (page - 1) * limit;

        const whereClause: Prisma.ProfileWhereInput = { deletedAt: null };

        if (search?.name) whereClause.name = { contains: search.name, mode: 'insensitive' };
        if (search?.gender) whereClause.gender = search.gender;

        const sortCriteria: Prisma.ProfileOrderByWithRelationInput = sortBy
            ? { [sortBy]: sortOrder || 'desc' }
            : { createdAt: 'desc' };

        const profiles = await this.profileRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.profileRepo.countAll(whereClause);

        return { 
            profiles, 
            total, 
            totalPages: Math.ceil(total / limit), 
            currentPage: page 
        };
    }

    async getById(id: string): Promise<User | null & Profile | null> {
        const numId = parseInt(id);

        const profile = await this.profileRepo.findById(numId);

        if (!profile) {
            throw new Error("Profile tidak ditemukan");
        }

        return profile;
    }

    async getByUserId(userId: number): Promise<Profile> {
        const profile = await this.profileRepo.findByUserId(userId);

        if (!profile) {
            throw new Error("Profile untuk user ini tidak ditemukan");
        }

        return profile;
    }

    async getMyProfile(userId: number): Promise<Profile> {
        const profile = await this.profileRepo.findByUserId(userId);
        if (!profile) {
            throw new Error("Profil belum diisi");
        }
        return profile;
    }

    // Mengisi atau Update Profil (Logic 1:1)
    async upsertMyProfile(userId: number, data: any): Promise<Profile> {
        const existingProfile = await this.profileRepo.findByUserId(userId);

        if (existingProfile) {
            // Jika sudah ada, gunakan repository update lama kamu
            return await this.profileRepo.update(existingProfile.id, data);
        } else {
            // Jika belum ada, gunakan repository create lama kamu
            return await this.profileRepo.create({
                name: data.name,
                gender: data.gender,
                address: data.address,
                profile_picture_url: data.profile_picture_url ?? null,
                user: { connect: { id: userId } }
            });
        }
    }

    async create(data: { 
        name: string; 
        gender: string; 
        address: string; 
        user_id: number; 
        profile_picture_url?: string 
    }): Promise<Profile> {
        
        // 1. Validasi: Satu user hanya boleh punya satu profile
        const existing = await this.profileRepo.findByUserId(data.user_id);
        if (existing) {
            throw new Error("User sudah memiliki profile");
        }

        // 2. Format data untuk Repository (Prisma)
        return await this.profileRepo.create({
            name: data.name,
            gender: data.gender,
            address: data.address,
            profile_picture_url: data.profile_picture_url ?? null,
            user: { 
                connect: { id: data.user_id } 
            }
        });
    }

    async update(id: string, data: Partial<Profile>): Promise<Profile> {
        // Validasi keberadaan data menggunakan getById yang sudah ada
        await this.getById(id);

        const numId = parseInt(id);
        return await this.profileRepo.update(numId, data);
    }

    async delete(id: string): Promise<Profile> {
        await this.getById(id);

        const numId = parseInt(id);
        return await this.profileRepo.softDelete(numId);
    }

    async exec() {
        const genderStats = await this.profileRepo.getGenderStats();

        return {
            byGender: genderStats
        };
    }
}