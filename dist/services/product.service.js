export class ProductService {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async list(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = { deletedAt: null };
        if (search?.name)
            whereClause.name = { contains: search.name, mode: 'insensitive' }; // search bisa pakai if atau ternary
        if (search?.min_price)
            whereClause.price = { gte: search.min_price }; // harus min dulu baru max
        if (search?.max_price)
            whereClause.price = { lte: search.max_price };
        const sortCriteria = sortBy
            ? { [sortBy]: sortOrder || 'desc' }
            : { createdAt: 'desc' };
        const products = await this.productRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.productRepo.countAll(whereClause);
        return { products, total, totalPages: Math.ceil(total / limit), currentPage: page };
    }
    async getById(id) {
        const numId = parseInt(id);
        const product = await this.productRepo.findById(numId);
        if (!product) {
            throw new Error("Product tidak ditemukan");
        }
        return product;
    }
    // export const searchProducts = async (name?: string, min_price?: number, max_price?: number) => { 
    //     return await prisma.product.findMany({
    //         where: {
    //             ...(name && {
    //                 name: {
    //                 contains: name
    //             }
    //             }),
    //             price: {
    //                 ...(min_price && { gte: min_price }),
    //                 ...(max_price && { lte: max_price})
    //             },
    //             deletedAt: null
    //         },
    //         include: {category: true}
    //     })
    // }    // search sudah dipakai di getAllProduct menggunakan if
    async create(data) {
        return await this.productRepo.create(data);
    }
    async update(id, data) {
        await this.getById(id);
        const numId = parseInt(id);
        const updateData = { ...data };
        if (updateData)
            updateData.price = Number(updateData.price);
        if (updateData)
            updateData.stock = Number(updateData.stock);
        if (updateData)
            updateData.categoryId = Number(updateData.categoryId);
        return await this.productRepo.update(numId, updateData);
    }
    async delete(id) {
        await this.getById(id);
        const numId = parseInt(id);
        return await this.productRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.productRepo.getStats();
        const categoryStats = await this.productRepo.getProductsByCategoryStats();
        return {
            overview: stats,
            byCategory: categoryStats
        };
    }
}
//# sourceMappingURL=product.service.js.map