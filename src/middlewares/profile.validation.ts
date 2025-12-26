import { body, param } from "express-validator";

export const createProfileValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama lengkap wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),

    body('gender')
        .trim()
        .notEmpty().withMessage('Jenis kelamin wajib diisi')
        .isIn(['Laki-laki', 'Perempuan']).withMessage('Gender harus Laki-laki atau Perempuan'),

    body('address')
        .trim()
        .notEmpty().withMessage('Alamat wajib diisi')
        .isLength({ min: 5 }).withMessage('Alamat minimal 5 karakter'),

    body('user_id')
        .notEmpty().withMessage('User ID wajib diisi')
        .isNumeric().withMessage('User ID harus berupa angka').toInt()
];

export const updateProfileValidation = [
    param('id')
        .isNumeric().withMessage('ID profil harus angka').toInt(),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),

    body('gender')
        .optional()
        .trim()
        .isIn(['Laki-laki', 'Perempuan']).withMessage('Gender harus Laki-laki atau Perempuan'),

    body('address')
        .optional()
        .trim()
        .isLength({ min: 5 }).withMessage('Alamat minimal 5 karakter'),
];

export const getProfileByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID profil harus angka').toInt()
];

export const getProfileByUserIdValidation = [
    param('userId')
        .isNumeric().withMessage('User ID harus angka').toInt()
];