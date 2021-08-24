const jwt = require('jsonwebtoken')

const config = require('@root/config.json')

const checkTokenAuth = async (req) => {
    const headerData = req.headers.authorization && req.headers.authorization.split(' ')

    const token = headerData && headerData[1]
    if (!token) return false

    let data
    try {
        data = await jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET)
    } catch {
        data = await jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET)
        return false
    }

    const userId = data && data._id

    return userId
}

const checkSessionAuth = async (req) => {
    const userId = req.session && req.session.userId

    return userId
}

module.exports = async (req, res, next) => {
    let userId = await checkTokenAuth(req)
    console.log("userId", userId)
    if (!userId) {
        userId = await checkSessionAuth(req)
    }

    if (userId) return res.status(403).json({ message: 'Данный путь не доступен для авторизированных пользователей' })
 
    next()
}