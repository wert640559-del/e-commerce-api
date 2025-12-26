import type { Prisma, PrismaClient, Order, OrderItems } from "../generated/client";
export interface IOrderRepository {
    create(tx: Prisma.TransactionClient, data: Prisma.OrderCreateInput): Promise<Order>;
    createItem(tx: Prisma.TransactionClient, data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;
    findById(id: number): Promise<(Order & {
        orderItems: OrderItems[];
    }) | null>;
    softDelete(id: number): Promise<Order>;
    countAll(where: Prisma.OrderWhereInput): Promise<number>;
    list(skip: number, take: number, where: Prisma.OrderWhereInput, orderBy: Prisma.OrderOrderByWithRelationInput): Promise<Order[]>;
    getStats(): Promise<Prisma.GetOrderAggregateType<{
        _count: {
            id: true;
        };
        _sum: {
            total: true;
        };
        _avg: {
            total: true;
        };
    }>>;
}
export declare class OrderRepository implements IOrderRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    create(tx: Prisma.TransactionClient, data: Prisma.OrderCreateInput): Promise<Order>;
    createItem(tx: Prisma.TransactionClient, data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;
    findById(id: number): Promise<({
        orderItems: ({
            product: {
                name: string;
                description: string | null;
                price: Prisma.Decimal;
                categoryId: number | null;
                id: number;
                stock: number;
                image: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            orderId: number;
            productId: number;
            quantity: number;
            priceAtPurchase: Prisma.Decimal | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: Prisma.Decimal;
        userId: number;
    }) | null>;
    list(skip: number, take: number, where: Prisma.OrderWhereInput, orderBy: Prisma.OrderOrderByWithRelationInput): Promise<Order[]>;
    countAll(where: Prisma.OrderWhereInput): Promise<number>;
    softDelete(id: number): Promise<Order>;
    getStats(): Promise<Prisma.GetOrderAggregateType<{
        where: {
            deletedAt: null;
        };
        _count: {
            id: true;
        };
        _sum: {
            total: true;
        };
        _avg: {
            total: true;
        };
    }>>;
}
//# sourceMappingURL=order.repository.d.ts.map