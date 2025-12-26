export class OrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // ✅ CREATE ORDER (PAKAI TX DARI SERVICE)
    async create(tx, data) {
        return await tx.order.create({
            data,
            include: { orderItems: true }
        });
    }
    // ✅ CREATE ORDER ITEM
    async createItem(tx, data) {
        return await tx.orderItems.create({ data });
    }
    async findById(id) {
        return await this.prisma.order.findUnique({
            where: {
                id,
                deletedAt: null
            },
            include: {
                orderItems: {
                    include: { product: true }
                }
            }
        });
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.order.findMany({
            skip,
            take,
            where: {
                ...where,
                deletedAt: null
            },
            orderBy
        });
    }
    async countAll(where) {
        return await this.prisma.order.count({
            where: {
                ...where,
                deletedAt: null
            }
        });
    }
    async softDelete(id) {
        return await this.prisma.order.update({
            where: {
                id,
                deletedAt: null
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async getStats() {
        return await this.prisma.order.aggregate({
            where: { deletedAt: null },
            _count: { id: true },
            _sum: { total: true },
            _avg: { total: true }
        });
    }
}
//# sourceMappingURL=order.repository.js.map