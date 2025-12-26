import { successResponse } from "../utils/response";
export class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.list = this.list.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }
    async list(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || 'desc';
        const result = await this.categoryService.list({
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
        successResponse(res, "Kategori berhasil diambil", result, pagination);
    }
    async getById(req, res) {
        if (!req.params.id) {
            throw new Error("Parameter id tidak ada");
        }
        const category = await this.categoryService.getById(req.params.id);
        successResponse(res, "Kategori berhasil diambil", category);
    }
    async create(req, res) {
        const { name } = req.body;
        if (!name) {
            throw new Error("Nama kategori wajib diisi");
        }
        const category = await this.categoryService.create({ name });
        successResponse(res, "Kategori berhasil dibuat", category, null, 201);
    }
    async update(req, res) {
        if (!req.params.id) {
            throw new Error("Parameter id tidak ada");
        }
        const category = await this.categoryService.update(req.params.id, req.body);
        successResponse(res, "Kategori berhasil diupdate", category);
    }
    async remove(req, res) {
        if (!req.params.id) {
            throw new Error("Parameter id tidak ada");
        }
        const deleted = await this.categoryService.delete(req.params.id);
        successResponse(res, "Kategori berhasil dihapus", deleted);
    }
}
//# sourceMappingURL=category.controller.js.map