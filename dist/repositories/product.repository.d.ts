import type { Category, Prisma, PrismaClient, Product } from "../generated/client.js";
import type { Decimal } from "../generated/runtime/client.js";
export interface IProductRepository {
    list(skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput): Promise<Product[]>;
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: number): Promise<Category | null & Product | null>;
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    softDelete(id: number): Promise<Product>;
    findComplex(categoryName: string, maxPrice: number): Promise<Product[]>;
    getStats(): Promise<Prisma.GetProductAggregateType<{
        _count: {
            id: true;
        };
        _avg: {
            price: true;
        };
        _sum: {
            stock: true;
        };
        _min: {
            price: true;
        };
        _max: {
            price: true;
        };
    }>>;
    getProductsByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
        _avg: {
            price: Decimal | null;
        };
        _count: {
            id: number;
        };
    })[]>;
}
export declare class ProductRepository implements IProductRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput): Promise<Product[]>;
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: number): Promise<Category | null & Product | null>;
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    softDelete(id: number): Promise<Product>;
    findComplex(categoryName: string, maxPrice: number): Promise<{
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
    }[]>;
    getStats(): Promise<Prisma.GetProductAggregateType<{
        _count: {
            id: true;
        };
        _avg: {
            price: true;
        };
        _sum: {
            stock: true;
        };
        _min: {
            price: true;
        };
        _max: {
            price: true;
        };
    }>>;
    getProductsByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
        _count: {
            id: number;
        };
        _avg: {
            price: Prisma.Decimal | null;
        };
    })[]>;
}
//# sourceMappingURL=product.repository.d.ts.map
