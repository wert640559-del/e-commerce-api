export class ProfileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
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
    async countAll(where) {
        return await this.prisma.profile.count({
            where: {
                ...where,
                deletedAt: null
            }
        });
    }
    async findById(id) {
        return await this.prisma.profile.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                user: true
            }
        }); // Cast ke any karena intersection type manual sesuai style ProductRepo kamu
    }
    async findByUserId(userId) {
        return await this.prisma.profile.findUnique({
            where: {
                user_id: userId,
                deletedAt: null
            }
        });
    }
    async create(data) {
        return await this.prisma.profile.create({
            data: data
        });
    }
    async update(id, data) {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
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
//# sourceMappingURL=profile.repository.js.map