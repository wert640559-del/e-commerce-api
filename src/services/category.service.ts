import type { Category, Prisma } from "../generated/client";
import type { ICategoryRepository } from "../repositories/category.repository";

interface FindAllParams {
    page: number;
    limit: number;
    search?: { 
        name?: string;
    };
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

interface CategoryListResponse {
    categories: Category[];
    total: number;
    totalPages: number;
    currentPage: number;
}

export interface ICategoryService {
    list(params: FindAllParams): Promise<CategoryListResponse>;
    getById(id: string): Promise<Category | null>;
    create(data: { name: string }): Promise<Category>;
    update(id: string, data: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<Category>;
    getDashboardStats(): Promise<{ overview: any }>;
}

export class CategoryService implements ICategoryService {
    constructor(private categoryRepo: ICategoryRepository) {}

    async list(params: FindAllParams): Promise<CategoryListResponse> {
        const { page, limit, search, sortBy, sortOrder } = params;

        const skip = (page - 1) * limit;

        // Query dasar (asumsi Category juga memiliki soft delete sesuai repo sebelumnya)
        const whereClause: Prisma.CategoryWhereInput = { deletedAt: null };

        if (search?.name) {
            whereClause.name = { contains: search.name, mode: 'insensitive' };
        }

        const sortCriteria: Prisma.CategoryOrderByWithRelationInput = sortBy
            ? { [sortBy]: sortOrder || 'desc' }
            : { createdAt: 'desc' };

        const categories = await this.categoryRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.categoryRepo.countAll(whereClause);

        return { 
            categories, 
            total, 
            totalPages: Math.ceil(total / limit), 
            currentPage: page 
        };
    }

    async getById(id: string): Promise<Category | null> {
        const numId = parseInt(id);
        const category = await this.categoryRepo.findById(numId);

        if (!category) {
            throw new Error("Category tidak ditemukan");
        }

        return category;
    }

    async create(data: { name: string }): Promise<Category> {
        return await this.categoryRepo.create(data);
    }

    async update(id: string, data: Partial<Category>): Promise<Category> {
        // Validasi keberadaan data dulu seperti di ProductService
        await this.getById(id);

        const numId = parseInt(id);
        return await this.categoryRepo.update(numId, data);
    }

    async delete(id: string): Promise<Category> {
        // Validasi keberadaan data
        await this.getById(id);

        const numId = parseInt(id);
        return await this.categoryRepo.softDelete(numId);
    }

    async getDashboardStats() {
        const stats = await this.categoryRepo.getStats();
        
        return {
            overview: stats
        };
    }
}