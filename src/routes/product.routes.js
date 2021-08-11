const express = require('express')

const router = express.Router()

const productServices = require('../services/product.services.js')
const productValidators = require('../validators/product.validators')

router.get('/', productServices.listProducts)
router.post('/', productValidators.createProductValidator, productServices.createProduct)
router.delete('/:_id', productServices.deleteProduct)
router.get('/:_id', productServices.getProduct)
router.patch('/:_id', productServices.updateProduct)

module.exports = router