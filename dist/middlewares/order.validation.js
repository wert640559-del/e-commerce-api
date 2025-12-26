import { body, param } from "express-validator";
export const createOrderValidation = [
    body('userId')
        .isInt({ gt: 0 })
        .withMessage('User ID harus angka'),
    body('items')
        .isArray({ min: 1 })
        .withMessage('Items harus berupa array'),
    body('items.*.productId')
        .isInt({ gt: 0 })
        .withMessage('Product ID harus angka'),
    body('items.*.quantity')
        .isInt({ gt: 0 })
        .withMessage('Quantity harus angka')
];
export const getOrderByIdValidation = [
    param('id')
        .isInt({ gt: 0 })
        .withMessage('ID harus angka')
];
//# sourceMappingURL=order.validation.js.map