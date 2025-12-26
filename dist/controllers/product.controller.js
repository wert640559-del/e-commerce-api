import { successResponse } from "../utils/response";
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
        this.list = this.list.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getStats = this.getStats.bind(this);
    }
    async list(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || 'desc';
        const result = await this.productService.list({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages
        };
        successResponse(res, "Produk berhasil diambil", result, pagination);
    }
    async getById(req, res) {
        if (!req.params.id) {
            throw new Error("Paramnya gk ada wok");
        }
        const product = await this.productService.getById(req.params.id);
        successResponse(res, "Produk berhasil diambil", product);
    }
    // async search = async (req: Request, res: Response) => {
    //     const { name, max_price, min_price } = req.query;
    //     const result = await searchProducts(name?.toString(), Number(max_price), Number(min_price))
    //     successResponse(
    //         res,
    //         "Produk berhasil diambil",
    //         result
    //     )
    // }
    async create(req, res) {
        const file = req.file;
        if (!file)
            throw new Error("Image is required");
        const { name, description, price, stock, categoryId } = req.body;
        const imageUrl = `/public/uploads/${file.filename}`;
        const data = {
            name: String(name),
            price: Number(price),
            stock: Number(stock),
            categoryId: Number(categoryId),
            ...(description && { description: description }),
            image: imageUrl
        };
        const products = await this.productService.create(data);
        successResponse(res, "Produk berhasil ditambahkan", products, null, 201);
    }
    async update(req, res) {
        const product = await this.productService.update(req.params.id, req.body);
        successResponse(res, "Produk berhasil diupdate", product);
    }
    async delete(req, res) {
        const deleted = await this.productService.delete(req.params.id);
        successResponse(res, "Produk berhasil dihapus", deleted);
    }
    async getStats(_req, res) {
        const stats = await this.productService.exec();
        successResponse(res, "Stats berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=product.controller.js.map