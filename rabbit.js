  
const amqp = require('amqplib')

async function connect() {
    const conn = await amqp.connect('amqps://iyjjjzdi:0Wpcd0oXbd3NJ8vJTkYgGBevypl1t86u@cattle.rmq2.cloudamqp.com/iyjjjzdi')
    const ch = await conn.createChannel()

    console.log('MQ connected🎉')

    await ch.assertExchange('newProductDelay', 'x-delayed-message', { durable: true, arguments: { 'x-delayed-type': 'direct' } })

    const gameInfo = {
        name: 'Rocket 3 League Game',
        landing: 'https://www.rocketleague.com/'
    }

    const queueMessage = Buffer.from(JSON.stringify(gameInfo))

    await ch.publish('newProduct', '', queueMessage, { headers: { 'x-delay': 10000 } })

    console.log('Message sent!')

}

connect()