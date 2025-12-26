import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { IAuthService } from "../services/auth.service";

export interface IAuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    me(req: Request, res: Response): Promise<void>;
}

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.me = this.me.bind(this);
    }

    async register(req: Request, res: Response) {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            throw new Error("Username, email, dan password wajib diisi");
        }

        const user = await this.authService.register({
            username: String(username),
            email: String(email),
            password_hash: String(password), // Akan di-hash di Service layer
            role: role ? String(role) : "USER"
        });

        successResponse(
            res, 
            "Registrasi berhasil", 
            user, 
            null, 
            201
        );
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email dan password wajib diisi");
        }

        const result = await this.authService.login(
            String(email), 
            String(password)
        );

        successResponse(
            res, 
            "Login berhasil", 
            result
        );
    }

    async me(req: Request, res: Response) {
        // Asumsi: id didapat dari middleware JWT yang ditaruh di req.user
        const userId = (req as any).user?.id;

        if (!userId) {
            throw new Error("Unauthorized: Token tidak valid");
        }

        const user = await this.authService.me(Number(userId));

        successResponse(
            res, 
            "Data profil user berhasil diambil", 
            user
        );
    }
}