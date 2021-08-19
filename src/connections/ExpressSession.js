const session = require('express-session')
const connectRedis = require('connect-redis')(session)

const config = require('@root/config.json')

const redisClient = require('./Redis')
const redisStore = new connectRedis({ client: redisClient })

const SESSION_SETTINGS = {
    store: redisStore,
    name: 'session_cookie',
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false }
}

module.exports = session(SESSION_SETTINGS)