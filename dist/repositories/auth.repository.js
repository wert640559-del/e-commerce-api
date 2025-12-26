export class AuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }
    async createUser(data) {
        return await this.prisma.user.create({
            data
        });
    }
    async findById(id) {
        return await this.prisma.user.findUnique({
            where: {
                id,
                // Jika user menggunakan soft delete, tambahkan: deletedAt: null
            }
        });
    }
}
//# sourceMappingURL=auth.repository.js.map