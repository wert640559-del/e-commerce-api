export class CategoryService {
    categoryRepo;
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async list(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        // Query dasar (asumsi Category juga memiliki soft delete sesuai repo sebelumnya)
        const whereClause = { deletedAt: null };
        if (search?.name) {
            whereClause.name = { contains: search.name, mode: 'insensitive' };
        }
        const sortCriteria = sortBy
            ? { [sortBy]: sortOrder || 'desc' }
            : { createdAt: 'desc' };
        const categories = await this.categoryRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.categoryRepo.countAll(whereClause);
        return {
            categories,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getById(id) {
        const numId = parseInt(id);
        const category = await this.categoryRepo.findById(numId);
        if (!category) {
            throw new Error("Category tidak ditemukan");
        }
        return category;
    }
    async create(data) {
        return await this.categoryRepo.create(data);
    }
    async update(id, data) {
        // Validasi keberadaan data dulu seperti di ProductService
        await this.getById(id);
        const numId = parseInt(id);
        return await this.categoryRepo.update(numId, data);
    }
    async delete(id) {
        // Validasi keberadaan data
        await this.getById(id);
        const numId = parseInt(id);
        return await this.categoryRepo.softDelete(numId);
    }
    async getDashboardStats() {
        const stats = await this.categoryRepo.getStats();
        return {
            overview: stats
        };
    }
}
//# sourceMappingURL=category.service.js.map