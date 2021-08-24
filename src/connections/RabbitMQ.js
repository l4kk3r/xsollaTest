  
const amqp = require('amqplib')
const axios = require('axios')

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const config = require('@root/config.json')

let ch = null

async function connect() {
    try {
        const conn = await amqp.connect(config.RABBITMQ_URI)
        ch = await conn.createChannel()
    
        await Promise.all([
            ch.assertExchange('newProduct', 'direct'),

            ch.assertQueue('newProductCheckLanding', { 
                durable: true, 
                autoDelete: false }),
            ch.bindQueue('newProductCheckLanding', 'newProduct', 'np1'),
            ch.consume('newProductCheckLanding', checkLandingConsumer),

            ch.assertExchange('DeadExchange', 'direct'),

            ch.assertQueue('DEQ', {
                arguments: {
                    'x-dead-letter-exchange': 'newProduct',
                    'x-dead-letter-routing-key': 'np1',
                    'x-message-ttl': 15000,
                    'x-expires': 100000
                }
            }),
            ch.bindQueue('DEQ', 'DeadExchange', '')
        ])
    
        console.log('🎉 RabbitMQ connected')
        return ch
    } catch {
        console.log('❌ RabbitMQ connection failed')
    }
}

const checkLandingConsumer = async (msg) => {
    let message = msg.content.toString()

    message = JSON.parse(message)

    const url = message.landing.url
    const isUrlValid = await checkUrl(url)

    console.log("New message. Url to check:", url)

    if (!isUrlValid) return ch.publish('DeadExchange', '', msg.content)

    console.log('url is valid')

    ch.ack(msg)
}

const checkUrl = async (url) => {
    try {
        await axios.get(url)

        return true
    } catch {
        return false
    }
}

module.exports = (async function() {
    const ch = await connect()
   
    return ch
})()