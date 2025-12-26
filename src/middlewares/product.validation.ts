import { body, param } from "express-validator"

export const createProductValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama produk wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),

    body('description')
        .trim()
        .notEmpty().withMessage('Deskripsi wajib diisi'),

    body('price')
        .isNumeric().withMessage('Harga harus angka')
        .custom(value => value > 0).withMessage('Harga harus lebih dari 0'),

    body('categoryId')
        .isNumeric().withMessage('Id kategori harus angka').toInt()
        .custom(value => value > 0).withMessage('Id kategori harus lebih dari 1'),
]

export const getProductByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
]