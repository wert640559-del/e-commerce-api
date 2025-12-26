import type { Category, Prisma, PrismaClient, Product } from "../generated/client";
export interface ICategoryRepository {
    list(skip: number, take: number, where: Prisma.CategoryWhereInput, orderBy: Prisma.CategoryOrderByWithRelationInput): Promise<Category[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    findById(id: number): Promise<(Category & {
        products: Product[];
    }) | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    softDelete(id: number): Promise<Category>;
    findPopular(minProducts: number): Promise<Category[]>;
    getStats(): Promise<Prisma.GetCategoryAggregateType<{
        _count: {
            id: true;
        };
    }>>;
}
export declare class CategoryRepository implements ICategoryRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.CategoryWhereInput, orderBy: Prisma.CategoryOrderByWithRelationInput): Promise<Category[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    findById(id: number): Promise<(Category & {
        products: Product[];
    }) | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    softDelete(id: number): Promise<Category>;
    findPopular(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
    getStats(): Promise<Prisma.GetCategoryAggregateType<{
        _count: {
            id: true;
        };
    }>>;
}
//# sourceMappingURL=category.repository.d.ts.map