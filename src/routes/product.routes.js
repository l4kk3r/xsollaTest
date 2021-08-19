const express = require('express')

const router = express.Router()

const productServices = require('@src/services/product.services.js')
const productValidators = require('@src/validators/product.validators')

const authRequiredMiddleware = require('@src/middlewares/authRequired')
const onlyProductOwnerMiddleware = require('@src/middlewares/onlyProductOwner')

router.get('/', productServices.listAll)
router.post('/', authRequiredMiddleware, productValidators.create, productServices.create)
router.delete('/:_id', authRequiredMiddleware, onlyProductOwnerMiddleware, productServices.delete)
router.get('/:_id', authRequiredMiddleware, productServices.get)
router.patch('/:_id', authRequiredMiddleware, onlyProductOwnerMiddleware, productServices.update)

module.exports = router