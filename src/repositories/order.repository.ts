import type {
  Prisma,
  PrismaClient,
  Order,
  OrderItems
} from "../generated/client";

export interface IOrderRepository {
  create(
    tx: Prisma.TransactionClient,
    data: Prisma.OrderCreateInput
  ): Promise<Order>;

  createItem(
    tx: Prisma.TransactionClient,
    data: Prisma.OrderItemsCreateInput
  ): Promise<OrderItems>;

  findById(id: number): Promise<(Order & { orderItems: OrderItems[] }) | null>;

  softDelete(id: number): Promise<Order>;

  countAll(where: Prisma.OrderWhereInput): Promise<number>;

  list(
    skip: number,
    take: number,
    where: Prisma.OrderWhereInput,
    orderBy: Prisma.OrderOrderByWithRelationInput
  ): Promise<Order[]>;

  getStats(): Promise<Prisma.GetOrderAggregateType<{
    _count: { id: true };
    _sum: { total: true };
    _avg: { total: true };
  }>>;
}

export class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  // ✅ CREATE ORDER (PAKAI TX DARI SERVICE)
  async create(
    tx: Prisma.TransactionClient,
    data: Prisma.OrderCreateInput
  ): Promise<Order> {
    return await tx.order.create({
      data,
      include: { orderItems: true }
    });
  }

  // ✅ CREATE ORDER ITEM
  async createItem(
    tx: Prisma.TransactionClient,
    data: Prisma.OrderItemsCreateInput
  ): Promise<OrderItems> {
    return await tx.orderItems.create({ data });
  }

  async findById(id: number) {
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

  async list(
    skip: number,
    take: number,
    where: Prisma.OrderWhereInput,
    orderBy: Prisma.OrderOrderByWithRelationInput
  ): Promise<Order[]> {
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

  async countAll(where: Prisma.OrderWhereInput): Promise<number> {
    return await this.prisma.order.count({
      where: {
        ...where,
        deletedAt: null
      }
    });
  }

  async softDelete(id: number): Promise<Order> {
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
