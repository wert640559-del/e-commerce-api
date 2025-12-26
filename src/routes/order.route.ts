import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";
import { OrderRepository } from "../repositories/order.repository";
import prismaInstance from "../database";
import { authenticate } from "../middlewares/auth.middleware"; // Asumsi nama middleware auth Anda

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Manajemen pesanan dan checkout
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Mendapatkan daftar semua pesanan
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar pesanan berhasil diambil
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Mendapatkan detail pesanan berdasarkan ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail pesanan ditemukan
 *       404:
 *         description: Order tidak ditemukan
 */

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Membuat pesanan baru (Checkout)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Checkout berhasil
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Menghapus atau membatalkan pesanan (Soft Delete)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pesanan berhasil dihapus
 */

/**
 * @swagger
 * /orders/stats/overview:
 *   get:
 *     summary: Mendapatkan statistik pesanan
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Statistik berhasil diambil
 * */

// Inisialisasi Repository, Service, dan Controller
const orderRepo = new OrderRepository(prismaInstance);
const service = new OrderService(orderRepo);
const controller = new OrderController(service);

// Routes
// Note: Gunakan authenticate middleware untuk proteksi checkout
router.get('/', (req, res) => controller.list(req, res));
router.get('/stats/overview', (req, res) => controller.getStats(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/checkout', authenticate, (req, res) => controller.checkout(req, res));
router.delete('/:id', authenticate, (req, res) => controller.remove(req, res));

export default router;