import type { Prisma, Order, OrderItems } from "../generated/client";
import type { IOrderRepository } from "../repositories/order.repository";
interface FindAllParams {
    page: number;
    limit: number;
    userId?: number | undefined;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
interface OrderListResponse {
    orders: Order[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IOrderService {
    list(params: FindAllParams): Promise<OrderListResponse>;
    getById(id: string): Promise<Order & {
        orderItems: OrderItems[];
    }>;
    checkout(userId: number, payload: {
        data: {
            productId: number;
            quantity: number;
        }[];
    }): Promise<Order>;
    delete(id: string): Promise<Order>;
    exec(): Promise<{
        overview: any;
    }>;
}
export declare class OrderService implements IOrderService {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    list(params: FindAllParams): Promise<OrderListResponse>;
    getById(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: Prisma.Decimal;
        userId: number;
    } & {
        orderItems: OrderItems[];
    }>;
    checkout(userId: number, payload: {
        data: {
            productId: number;
            quantity: number;
        }[];
    }): Promise<Order>;
    delete(id: string): Promise<Order>;
    exec(): Promise<{
        overview: Prisma.GetOrderAggregateType<{
            _count: {
                id: true;
            };
            _sum: {
                total: true;
            };
            _avg: {
                total: true;
            };
        }>;
    }>;
}
export {};
//# sourceMappingURL=order.service.d.ts.map