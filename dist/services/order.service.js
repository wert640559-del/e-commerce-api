import prismaInstance from "../database";
import { Decimal } from "../generated/runtime/client";
export class OrderService {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async list(params) {
        const { page, limit, userId, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const where = { deletedAt: null };
        if (userId)
            where.userId = userId;
        const orderBy = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const orders = await this.orderRepo.list(skip, limit, where, orderBy);
        const total = await this.orderRepo.countAll(where);
        return {
            orders,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getById(id) {
        const orderId = Number(id);
        const order = await this.orderRepo.findById(orderId);
        if (!order) {
            throw new Error("Order tidak ditemukan");
        }
        return order;
    }
    async checkout(userId, payload) {
        const items = payload.data;
        const productIds = items.map(i => i.productId);
        return await prismaInstance.$transaction(async (tx) => {
            // 1. Ambil semua data produk sekaligus
            const products = await tx.product.findMany({
                where: { id: { in: productIds } }
            });
            let totalOrderPrice = 0;
            const itemsToCreate = [];
            for (const item of items) {
                const product = products.find(p => p.id === item.productId);
                if (!product)
                    throw new Error(`Produk ID ${item.productId} tidak ditemukan`);
                if (product.stock < item.quantity)
                    throw new Error(`Stok ${product.name} tidak cukup`);
                const subtotal = Number(product.price) * item.quantity;
                totalOrderPrice += subtotal;
                // 2. Gunakan decrement untuk menghindari race condition
                await tx.product.update({
                    where: { id: product.id },
                    data: { stock: { decrement: item.quantity } }
                });
                itemsToCreate.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    priceAtPurchase: product.price // Simpan snapshot harga
                });
            }
            // 3. Buat Order & OrderItems dalam satu kali panggil
            return await tx.order.create({
                data: {
                    userId,
                    total: new Decimal(totalOrderPrice),
                    orderItems: {
                        create: itemsToCreate
                    }
                },
                include: { orderItems: true } // Mengembalikan data lengkap
            });
        });
    }
    async delete(id) {
        await this.getById(id);
        return await this.orderRepo.softDelete(Number(id));
    }
    async exec() {
        const stats = await this.orderRepo.getStats();
        return { overview: stats };
    }
}
//# sourceMappingURL=order.service.js.map