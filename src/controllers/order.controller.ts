import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { IOrderService } from "../services/order.service";

export interface IOrderController {
    list(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    checkout(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
    getStats(req: Request, res: Response): Promise<void>;
}

export class OrderController implements IOrderController {
    constructor(private orderService: IOrderService) {
        // Penting: Bind method agar 'this' tidak hilang saat dipanggil di router
        this.list = this.list.bind(this);
        this.getById = this.getById.bind(this);
        this.checkout = this.checkout.bind(this);
        this.remove = this.remove.bind(this);
        this.getStats = this.getStats.bind(this);
    }

    async list(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const userId = req.query.userId ? Number(req.query.userId) : undefined;
        const sortBy = req.query.sortBy as string;
        const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

        const result = await this.orderService.list({
            page,
            limit,
            userId,
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
            "Daftar pesanan berhasil diambil",
            result.orders,
            pagination
        );
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) throw new Error("ID Order diperlukan");

        const order = await this.orderService.getById(id);

        successResponse(
            res,
            "Detail pesanan berhasil diambil",
            order
        );
    }

    async checkout(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) throw new Error("User ID tidak ditemukan");

        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            throw new Error("Data checkout (array) diperlukan");
        }

        const result = await this.orderService.checkout(userId, { data });

        successResponse(
            res,
            "Checkout berhasil dilakukan",
            result,
            null,
            201
        );
    }


    async remove(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) throw new Error("ID Order diperlukan");

        const deletedOrder = await this.orderService.delete(id);

        successResponse(
            res,
            "Pesanan berhasil dibatalkan/dihapus",
            deletedOrder
        );
    }

    async getStats(_req: Request, res: Response) {
        const stats = await this.orderService.exec();

        successResponse(
            res,
            "Statistik pesanan berhasil diambil",
            stats,
            null,
            200
        );
    }
}