import type { Category, Prisma } from "../generated/client.js";
import type { ICategoryRepository } from "../repositories/category.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
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
    create(data: {
        name: string;
    }): Promise<Category>;
    update(id: string, data: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<Category>;
    getDashboardStats(): Promise<{
        overview: any;
    }>;
}
export declare class CategoryService implements ICategoryService {
    private categoryRepo;
    constructor(categoryRepo: ICategoryRepository);
    list(params: FindAllParams): Promise<CategoryListResponse>;
    getById(id: string): Promise<Category | null>;
    create(data: {
        name: string;
    }): Promise<Category>;
    update(id: string, data: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<Category>;
    getDashboardStats(): Promise<{
        overview: Prisma.GetCategoryAggregateType<{
            _count: {
                id: true;
            };
        }>;
    }>;
}
export {};
//# sourceMappingURL=category.service.d.ts.map
