import { Router } from "express"
import { createProductValidation, getProductByIdValidation } from "../middlewares/product.validation"
import { ProductController } from "../controllers/product.controller"
import { validate } from "../utils/validator"
import { authenticate } from "../middlewares/auth.middleware"
import { upload } from "../middlewares/upload.middleware"
import { ProductRepository } from "../repositories/product.repository"
import prismaInstance from "../database"
import { ProductService } from "../services/product.service"

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manajemen data produk dan inventaris
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Mendapatkan daftar semua produk
 *     tags: [Products]
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
 *         name: search[name]
 *         schema:
 *           type: string
 *       - in: query
 *         name: search[min_price]
 *         schema:
 *           type: number
 *       - in: query
 *         name: search[max_price]
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar produk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     total:
 *                       type: integer
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Membuat produk baru
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 */

/**
 * @swagger
 * /products/stats:
 *   get:
 *     summary: Mendapatkan statistik produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Statistik berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     overview:
 *                       type: object
 *                     byCategory:
 *                       type: array
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Detail produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data produk ditemukan
 *       404:
 *         description: Produk tidak ditemukan
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update data produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Update berhasil
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Hapus produk (Soft Delete)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         image:
 *           type: string
 *         categoryId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
*/

const repo = new ProductRepository(prismaInstance)
const service = new ProductService(repo)
const controller = new ProductController(service)

router.get('/', controller.list)
router.get('/stats', controller.getStats)  // letakkan stats ini di atas getById
router.get('/:id', validate(getProductByIdValidation), controller.getById)
router.post('/', authenticate, upload.single('image'), validate(createProductValidation), controller.create)
router.put('/:id', authenticate, upload.single('image'), controller.update)
router.delete('/:id', authenticate, controller.delete)

export default router