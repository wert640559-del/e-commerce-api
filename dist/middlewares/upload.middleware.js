import multer from 'multer';
import path from 'node:path';
export const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); //biar di database ga ada duplikasi
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
export const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { // hanya bisa file image
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // maksimal hanya diupload 2mb
    fileFilter: fileFilter // difilter file hanya gambar
});
//# sourceMappingURL=upload.middleware.js.map