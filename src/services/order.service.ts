import type { Prisma, Order, OrderItems } from "../generated/client"
import type { IOrderRepository } from "../repositories/order.repository"
import prismaInstance from "../prisma"
import { Decimal } from "../generated/runtime/client"

interface FindAllParams {
    page: number
    limit: number
    userId?: number | undefined
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface OrderListResponse {
    orders: Order[]
    total: number
    totalPages: number
    currentPage: number
}

export interface IOrderService {
    list(params: FindAllParams): Promise<OrderListResponse>
    getById(id: string): Promise<Order & { orderItems: OrderItems[] }>
    checkout(
        userId: number,
        payload: { data: { productId: number; quantity: number }[] }
    ): Promise<Order>
    delete(id: string): Promise<Order>
    exec(): Promise<{ overview: any }>
}

export class OrderService implements IOrderService {
    constructor(
        private orderRepo: IOrderRepository,
    ) {}

    async list(params: FindAllParams): Promise<OrderListResponse> {
        const { page, limit, userId, sortBy, sortOrder } = params
        const skip = (page - 1) * limit

        const where: Prisma.OrderWhereInput = { deletedAt: null }
        if (userId) where.userId = userId

        const orderBy: Prisma.OrderOrderByWithRelationInput =
            sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" }

        const orders = await this.orderRepo.list(skip, limit, where, orderBy)
        const total = await this.orderRepo.countAll(where)

        return {
            orders,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        }
    }

    async getById(id: string) {
        const orderId = Number(id)
        const order = await this.orderRepo.findById(orderId)

        if (!order) {
            throw new Error("Order tidak ditemukan")
        }

        return order
    }

    async checkout(
        userId: number,
        payload: { data: { productId: number; quantity: number }[] }
    ): Promise<Order> {
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
                if (!product) throw new Error(`Produk ID ${item.productId} tidak ditemukan`);
                if (product.stock < item.quantity) throw new Error(`Stok ${product.name} tidak cukup`);

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

    async delete(id: string): Promise<Order> {
        await this.getById(id)
        return await this.orderRepo.softDelete(Number(id))
    }

    async exec() {
        const stats = await this.orderRepo.getStats()
        return { overview: stats }
    }
}
