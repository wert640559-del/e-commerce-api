import type { Category, Prisma, Product } from "../generated/client"
import type { IProductRepository } from "../repositories/product.repository";

interface FindAllParams {
    page: number,
    limit: number,
    search?: { 
        name?: string, 
        max_price?: number, 
        min_price?: number 
    },
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
}

interface ProductListResponse {
    products: Product[], 
    total: number, 
    totalPages: number, 
    currentPage: number
}

export interface IProductService {
    list(params: FindAllParams): Promise<ProductListResponse>;
    getById(id: string): Promise<Category | null & Product | null>
    create(data: { name: string, description?: string, price: number, stock: number, image: string, categoryId?: number }): Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>
    delete(id: string): Promise<Product>
    exec(): Promise<{ overview: any, byCategory: any}>
}

export class ProductService implements IProductService {
    constructor(private productRepo: IProductRepository) {}

    async list(params: FindAllParams): Promise<ProductListResponse> {
        const { page, limit, search, sortBy, sortOrder } = params;

        const skip = (page - 1) * limit

        const whereClause: Prisma.ProductWhereInput = { deletedAt: null }

        if (search?.name) whereClause.name = { contains: search.name, mode: 'insensitive' }  // search bisa pakai if atau ternary
        if (search?.min_price) whereClause.price = { gte: search.min_price }  // harus min dulu baru max
        if (search?.max_price) whereClause.price = { lte: search.max_price }

        const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy
        ? { [sortBy]: sortOrder || 'desc' } 
        : { createdAt: 'desc' }

        const products = await this.productRepo.list(skip, limit, whereClause, sortCriteria)

        const total = await this.productRepo.countAll(whereClause)

        return { products, total ,totalPages: Math.ceil(total / limit), currentPage: page }
    }

    async getById(id: string): Promise<Category | null & Product | null> {
        const numId = parseInt(id)

        const product = await this.productRepo.findById(numId)

        if (!product) {
            throw new Error("Product tidak ditemukan")
        }

        return product
    }

    // export const searchProducts = async (name?: string, min_price?: number, max_price?: number) => { 
    //     return await prisma.product.findMany({
    //         where: {
    //             ...(name && {
    //                 name: {
    //                 contains: name
    //             }
    //             }),
    //             price: {
    //                 ...(min_price && { gte: min_price }),
    //                 ...(max_price && { lte: max_price})
    //             },
    //             deletedAt: null
    //         },
    //         include: {category: true}
    //     })
    // }    // search sudah dipakai di getAllProduct menggunakan if

    async create(data: {name: string, description?: string, price: number, stock: number, categoryId?: number, image: string}): Promise<Product> {
        return await this.productRepo.create(data)
    }

    async update(id: string, data: Partial<Product>): Promise<Product> {
        await this.getById(id)

        const numId = parseInt(id)

        const updateData: any = { ...data }

        if (updateData) updateData.price = Number(updateData.price)
        if (updateData) updateData.stock = Number(updateData.stock)
        if (updateData) updateData.categoryId = Number(updateData.categoryId)

        return await this.productRepo.update(numId, updateData)
    }

    async delete(id: string): Promise<Product> {
        await this.getById(id)

        const numId = parseInt(id)
        
        return await this.productRepo.softDelete(numId)
    }

    async exec() {
        const stats = await this.productRepo.getStats()
        const categoryStats = await this.productRepo.getProductsByCategoryStats()

        return {
            overview: stats,
            byCategory: categoryStats
        }
    }
}