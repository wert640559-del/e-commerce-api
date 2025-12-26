import type { Category, Prisma, Product } from "../generated/client.js";
import type { IProductRepository } from "../repositories/product.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        max_price?: number;
        min_price?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
interface ProductListResponse {
    products: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IProductService {
    list(params: FindAllParams): Promise<ProductListResponse>;
    getById(id: string): Promise<Category | null & Product | null>;
    create(data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        image: string;
        categoryId?: number;
    }): Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class ProductService implements IProductService {
    private productRepo;
    constructor(productRepo: IProductRepository);
    list(params: FindAllParams): Promise<ProductListResponse>;
    getById(id: string): Promise<Category | null & Product | null>;
    create(data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        categoryId?: number;
        image: string;
    }): Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
    exec(): Promise<{
        overview: Prisma.GetProductAggregateType<{
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
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
            _avg: {
                price: Prisma.Decimal | null;
            };
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=product.service.d.ts.map
