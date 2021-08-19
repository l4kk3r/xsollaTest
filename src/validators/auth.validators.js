const { check } = require('express-validator');

module.exports.signup = [check('email', 'Поле email некорректно').isEmail(),
                        check('password', 'Поле password должно быть длиннее 3 символов').isLength({ min: 4 }), 
                        check('role', 'Поле role должно быть либо "seller" либо "customer"').isIn(['seller', 'customer'])]

module.exports.login = [check('email', 'Поле email некорректно').isEmail(),
                        check('password', 'Поле password должно быть длиннее 3 символов').isLength({ min: 4 })]

module.exports.renewToken = [check('refreshToken', 'Поле refreshtoken не должно быть пустым').notEmpty()]