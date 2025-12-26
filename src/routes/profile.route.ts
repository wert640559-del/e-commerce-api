import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { ProfileService } from "../services/profile.service";
import { ProfileRepository } from "../repositories/profile.repository";
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../utils/validator";
import { 
    getProfileByIdValidation 
} from "../middlewares/profile.validation";
import prismaInstance from "../database";

const router = Router();

// Inisialisasi sesuai request
const repo = new ProfileRepository(prismaInstance);
const service = new ProfileService(repo);
const controller = new ProfileController(service);

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Manajemen data profil pengguna (Relasi 1:1)
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         gender:
 *           type: string
 *         address:
 *           type: string
 *         profile_picture_url:
 *           type: string
 *           nullable: true
 *         user_id:
 *           type: integer
 */

// --- ROUTES UNTUK USER (PERSONAL) ---

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Mendapatkan profil user yang sedang login
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil profil sendiri
 *   post:
 *     summary: Mengisi atau Update profil sendiri (Upsert)
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - gender
 *               - address
 *               - user_id
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               profile_picture_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil berhasil disimpan
 * */

// --- ROUTES UNTUK ADMIN (MANAGEMENT) ---

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: (Admin) Mendapatkan semua daftar profil
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar profil
 */

/**
 * @swagger
 * /profile/stats:
 *   get:
 *     summary: (Admin) Statistik data profil
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil
 */

/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     summary: (Admin) Hapus profil berdasarkan ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profil berhasil dihapus
 */

router.get("/me", authenticate, controller.getMe);
router.get("/", authenticate, controller.list);
router.get("/stats", authenticate, controller.getStats);
router.post('/me', authenticate, upload.single('image'), controller.create);
router.delete("/:id", authenticate, validate(getProfileByIdValidation), controller.remove);

export default router;