import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { validate } from "../utils/validator";
import { loginValidation, registerValidation } from "../middlewares/auth.validation";
import prismaInstance from "../database";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Manajemen autentikasi pengguna
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 *     responses:
 *       200:
 *         description: Login berhasil
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
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *                  
 *       401:
 *         description: Email atau password salah
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                  type: string
 *                  example: Harits
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Register berhasil
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
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *                  
 *       401:
 *         description: Email atau password salah
 */


const repo = new AuthRepository(prismaInstance);
const service = new AuthService(repo);
const controller = new AuthController(service);

// Tanpa authenticate (karena ini pintu masuk), tapi pakai validate 
router.post('/login', validate(loginValidation), (req, res) => controller.login(req, res));
router.post('/register', validate(registerValidation), (req, res) => controller.register(req, res));

export default router;