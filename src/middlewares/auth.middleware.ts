import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/response'
import config from "../utils/env"

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return errorResponse(res, "Token tidak ditemukan", 401)
    }

    const token = authHeader?.split(" ")[1]

    try {
        const payload = jwt.verify(token!, config.JWT_SECRET) as { id: number; role: string }

        req.user = payload
        next()
    } catch (error) {
        console.error("JWT Error:", error);
        return errorResponse(res, "Token tidak valid", 401)
    }
}