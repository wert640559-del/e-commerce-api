export class CategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            // Opsional: sertakan count produk jika diperlukan
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
    }
    async countAll(where) {
        return await this.prisma.category.count({ where });
    }
    async findById(id) {
        return await this.prisma.category.findUnique({
            where: {
                id,
                // Jika Category juga menggunakan soft delete (deletedAt)
                // deletedAt: null, 
            },
            include: {
                products: true // Menyertakan daftar produk dalam kategori ini
            }
        });
    }
    async create(data) {
        return await this.prisma.category.create({ data });
    }
    async update(id, data) {
        return await this.prisma.category.update({
            where: { id },
            data
        });
    }
    async softDelete(id) {
        // Pastikan field deletedAt ada di model Category pada schema.prisma
        return await this.prisma.category.update({
            where: { id },
            data: {
                // @ts-ignore (jika belum ada fieldnya di schema)
                deletedAt: new Date()
            }
        });
    }
    async findPopular() {
        return await this.prisma.category.findMany({
            where: {
                products: {
                    some: {} // Mengambil kategori yang punya minimal 1 produk
                }
            }
        });
    }
    async getStats() {
        return await this.prisma.category.aggregate({
            _count: { id: true }
        });
    }
}
//# sourceMappingURL=category.repository.js.map