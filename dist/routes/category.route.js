import { Router } from "express";
import { createCategoryValidation, getCategoryByIdValidation, updateCategoryValidation } from "../middlewares/category.validation";
import { CategoryController } from "../controllers/category.controller";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";
import { validate } from "../utils/validator";
import { authenticate } from "../middlewares/auth.middleware"; // Sesuaikan jika kategori butuh auth
import prismaInstance from "../database";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Manajemen kategori
 */
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Ambil daftar kategori
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: makanan
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: desc
 *     responses:
 *       200:
 *         description: Kategori berhasil diambil
 */
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Ambil kategori berdasarkan ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Kategori berhasil diambil
 *       404:
 *         description: Category tidak ditemukan
 */
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Buat kategori baru
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Minuman
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 *       400:
 *         description: Validasi gagal
 */
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update kategori
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Snack
 *     responses:
 *       200:
 *         description: Kategori berhasil diupdate
 */
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Hapus kategori (soft delete)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 */
// Inisialisasi Layer (Persis pola ProductRoute)
const repo = new CategoryRepository(prismaInstance);
const service = new CategoryService(repo);
const controller = new CategoryController(service);
// Route Definitions
router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', validate(getCategoryByIdValidation), (req, res) => controller.getById(req, res));
router.post('/', authenticate, validate(createCategoryValidation), (req, res) => controller.create(req, res));
router.put('/:id', authenticate, validate(updateCategoryValidation), (req, res) => controller.update(req, res));
router.delete('/:id', authenticate, validate(getCategoryByIdValidation), (req, res) => controller.remove(req, res));
export default router;
//# sourceMappingURL=category.route.js.map