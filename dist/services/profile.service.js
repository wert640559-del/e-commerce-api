export class ProfileService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    async list(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = { deletedAt: null };
        if (search?.name)
            whereClause.name = { contains: search.name, mode: 'insensitive' };
        if (search?.gender)
            whereClause.gender = search.gender;
        const sortCriteria = sortBy
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
    async getById(id) {
        const numId = parseInt(id);
        const profile = await this.profileRepo.findById(numId);
        if (!profile) {
            throw new Error("Profile tidak ditemukan");
        }
        return profile;
    }
    async getByUserId(userId) {
        const profile = await this.profileRepo.findByUserId(userId);
        if (!profile) {
            throw new Error("Profile untuk user ini tidak ditemukan");
        }
        return profile;
    }
    async getMyProfile(userId) {
        const profile = await this.profileRepo.findByUserId(userId);
        if (!profile) {
            throw new Error("Profil belum diisi");
        }
        return profile;
    }
    // Mengisi atau Update Profil (Logic 1:1)
    async upsertMyProfile(userId, data) {
        const existingProfile = await this.profileRepo.findByUserId(userId);
        if (existingProfile) {
            // Jika sudah ada, gunakan repository update lama kamu
            return await this.profileRepo.update(existingProfile.id, data);
        }
        else {
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
    async create(data) {
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
    async update(id, data) {
        // Validasi keberadaan data menggunakan getById yang sudah ada
        await this.getById(id);
        const numId = parseInt(id);
        return await this.profileRepo.update(numId, data);
    }
    async delete(id) {
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
//# sourceMappingURL=profile.service.js.map