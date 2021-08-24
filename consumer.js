  
const amqp = require('amqplib')

async function connect() {
    const conn = await amqp.connect('amqps://iyjjjzdi:0Wpcd0oXbd3NJ8vJTkYgGBevypl1t86u@cattle.rmq2.cloudamqp.com/iyjjjzdi')
    const ch = await conn.createChannel()

    await ch.assertExchange('newProduct', 'fanout', { durable: true })

    await ch.assertQueue('newProductMain', { durable: true })
    
    await ch.bindQueue('newProductMain', 'newProduct', 'rk1')

    console.log('Listening for new messages!')
    await ch.consume('newProductMain', async (msg) => {
        let message = msg.content.toString()

        try {
            message = JSON.parse(message)
        } catch {
            ch.ack(msg)
            console.log("New message was not a valid json")
            return
        }

        console.log("New message", message)

        const url = message.landing
        
        ch.ack(msg)
    })

}

connect()