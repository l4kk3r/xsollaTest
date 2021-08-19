const redis = require('redis')

const config = require('@root/config.json')

const redisClient = redis.createClient({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD
})

redisClient.on('connect', () => console.log('🎉 Redis connected'))
redisClient.on('error', () => console.log('❌ Redis connection failed'))

module.exports = redisClient