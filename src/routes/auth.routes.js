const express = require('express')

const router = express.Router()

const authServices = require('@src/services/auth.services')
const authValidators = require('@src/validators/auth.validators')

const authRequiredMiddleware = require('@src/middlewares/authRequired')
const authForbiddenMiddleware = require('@src/middlewares/authForbidden')

router.post('/signup', authForbiddenMiddleware, authValidators.signup, authServices.signup)
router.post('/client/login', authForbiddenMiddleware, authValidators.login, authServices.clientLogin)
router.post('/server/login', authForbiddenMiddleware, authValidators.login, authServices.serverLogin)
router.post('/renewToken', authValidators.renewToken, authServices.renewToken)
router.get('/logout', authRequiredMiddleware, authServices.logout)

module.exports = router