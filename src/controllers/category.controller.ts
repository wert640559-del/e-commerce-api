import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { ICategoryService } from "../services/category.service";

export interface ICategoryController {
    list(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
}

export class CategoryController implements ICategoryController {
    constructor(private categoryService: ICategoryService) { 
        this.list = this.list.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async list(req: Request, res: Response): Promise<void> {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as any;
        const sortBy = req.query.sortBy as string;
        const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

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

        successResponse(
            res,
            "Kategori berhasil diambil",
            result,
            pagination
        );
    }

    async getById(req: Request, res: Response): Promise<void> {
        if (!req.params.id) {
            throw new Error("Parameter id tidak ada");
        }

        const category = await this.categoryService.getById(req.params.id);

        successResponse(
            res,
            "Kategori berhasil diambil",
            category
        );
    }

    async create(req: Request, res: Response): Promise<void> {
        const { name } = req.body;

        if (!name) {
            throw new Error("Nama kategori wajib diisi");
        }

        const category = await this.categoryService.create({ name });

        successResponse(
            res,
            "Kategori berhasil dibuat",
            category,
            null,
            201
        );
    }

    async update(req: Request, res: Response): Promise<void> {
        if (!req.params.id) {
            throw new Error("Parameter id tidak ada");
        }

        const category = await this.categoryService.update(req.params.id, req.body);

        successResponse(
            res,
            "Kategori berhasil diupdate",
            category
        );
    }

    async remove(req: Request, res: Response): Promise<void> {
        if (!req.params.id) {
            throw new Error("Parameter id tidak ada");
        }

        const deleted = await this.categoryService.delete(req.params.id);

        successResponse(
            res,
            "Kategori berhasil dihapus",
            deleted
        );
    }
}