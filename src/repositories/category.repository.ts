import type { Category, Prisma, PrismaClient, Product } from "../generated/client";

export interface ICategoryRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.CategoryWhereInput,
        orderBy: Prisma.CategoryOrderByWithRelationInput
    ): Promise<Category[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    findById(id: number): Promise<(Category & { products: Product[] }) | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    softDelete(id: number): Promise<Category>;
    // Mencari kategori yang memiliki jumlah produk di atas angka tertentu
    findPopular(minProducts: number): Promise<Category[]>;
    getStats(): Promise<Prisma.GetCategoryAggregateType<{
        _count: {
            id: true;
        };
    }>>;
}

export class CategoryRepository implements ICategoryRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.CategoryWhereInput,
        orderBy: Prisma.CategoryOrderByWithRelationInput
    ): Promise<Category[]> {
        return await this.prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            // Opsional: sertakan count produk jika diperlukan
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
    }

    async countAll(where: Prisma.CategoryWhereInput): Promise<number> {
        return await this.prisma.category.count({ where });
    }

    async findById(id: number): Promise<(Category & { products: Product[] }) | null> {
        return await this.prisma.category.findUnique({
            where: {
                id,
                // Jika Category juga menggunakan soft delete (deletedAt)
                // deletedAt: null, 
            },
            include: {
                products: true // Menyertakan daftar produk dalam kategori ini
            }
        }) as (Category & { products: Product[] }) | null;
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return await this.prisma.category.create({ data });
    }

    async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return await this.prisma.category.update({
            where: { id },
            data
        });
    }

    async softDelete(id: number): Promise<Category> {
        // Pastikan field deletedAt ada di model Category pada schema.prisma
        return await this.prisma.category.update({
            where: { id },
            data: {
                // @ts-ignore (jika belum ada fieldnya di schema)
                deletedAt: new Date()
            }
        });
    }

    async findPopular() {
    return await this.prisma.category.findMany({
        where: {
            products: {
                some: {} // Mengambil kategori yang punya minimal 1 produk
            }
        }
    });
}

    async getStats() {
        return await this.prisma.category.aggregate({
            _count: { id: true }
        });
    }
}