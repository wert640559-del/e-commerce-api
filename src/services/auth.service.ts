import type { User, Prisma } from "../generated/client";
import type { IAuthRepository } from "../repositories/auth.repository";
import * as bcrypt from "bcrypt";
import config from '../utils/env'
import jwt from 'jsonwebtoken'



// Definisikan secret key (sebaiknya di .env)

interface AuthResponse {
    user: Omit<User, "password_hash">;
    token: string;
}

export interface IAuthService {
    register(data: Prisma.UserCreateInput): Promise<Omit<User, "password_hash">>;
    login(email: string, password: string): Promise<AuthResponse>;
    me(userId: number): Promise<Omit<User, "password_hash">>;
}

export class AuthService implements IAuthService {
    constructor(private authRepo: IAuthRepository) {}

    async register(data: Prisma.UserCreateInput): Promise<Omit<User, "password_hash">> {
        // 1. Cek apakah email sudah terdaftar
        const existingUser = await this.authRepo.findUserByEmail(data.email);
        if (existingUser) {
            throw new Error("Email sudah digunakan");
        }

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password_hash, salt);

        // 3. Simpan User dengan password yang sudah di-hash
        const user = await this.authRepo.createUser({
            ...data,
            password_hash: hashedPassword
        });

        // 4. Return user tanpa password_hash
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        // 1. Cari user berdasarkan email
        const user = await this.authRepo.findUserByEmail(email);
        if (!user) {
            throw new Error("Email atau password salah");
        }

        // 2. Bandingkan password
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatch) {
            throw new Error("Email atau password salah");
        }

        // 3. Generate JWT Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            config.JWT_SECRET, // Gunakan dari config
            { expiresIn: '1d' }
        );

        // 4. Return user (tanpa password) dan token
        const { password_hash, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    }

    async me(userId: number): Promise<Omit<User, "password_hash">> {
        const user = await this.authRepo.findById(userId);
        
        if (!user) {
            throw new Error("User tidak ditemukan");
        }

        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}