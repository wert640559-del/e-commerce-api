import multer from 'multer';
import type { Request } from 'express';
export declare const storage: multer.StorageEngine;
export declare const fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => void;
export declare const upload: multer.Multer;
//# sourceMappingURL=upload.middleware.d.ts.map