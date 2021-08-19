const { check } = require('express-validator');

module.exports.create = [check('name', 'Поле name должно быть длиннее 3 символов').notEmpty().isLength({ min: 3 }),
                        check('sku', 'Поле sku не должно быть пустым').notEmpty(), 
                        check('type', 'Поле type не должно быть пустым').notEmpty(),
                        check('price', 'Поле price должно быть числом').notEmpty().isInt({ min: 0 }).withMessage('Цена должна быть неотрицательной')]