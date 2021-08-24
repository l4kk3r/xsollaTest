var amqp = require('amqplib');
var url = 'amqps://iyjjjzdi:0Wpcd0oXbd3NJ8vJTkYgGBevypl1t86u@cattle.rmq2.cloudamqp.com/iyjjjzdi';

amqp.connect(url).then(function(conn) {
    //Subscribe to the WorkQueue in WorkExchange to which the "delayed" messages get dead-letter'ed (is that a verb?) to.
    return conn.createChannel().then(function(ch) {
        return ch.assertExchange('WorkExchange', 'direct').then(function() {
            return ch.assertQueue('WorkQueue', {
                autoDelete: false,
                durable: true
            })
        }).then(function() {
            return ch.bindQueue('WorkQueue', 'WorkExchange', 'rk1');
        }).then(function() {
            console.log('Waiting for consume.');

            return ch.consume('WorkQueue', function(msg) {
                console.log('Received message.');
                console.log(msg.content.toString());
                ch.publish('DeadExchange', '', Buffer.from("Over the Hills and Far Away!"));
                ch.ack(msg);
            });
        });
    })
}).then(function() {
    //Now send a test message to DeadExchange to DEQ queue.
    return amqp.connect(url).then(function(conn) {
        return conn.createChannel();
    }).then(function(ch) {
        return ch.assertExchange('DeadExchange', 'direct').then(function() {
            return ch.assertQueue('DEQ', {
                arguments: {
                    'x-dead-letter-exchange': 'WorkExchange',
                    'x-dead-letter-routing-key': 'rk1',
                    'x-message-ttl': 15000,
                    'x-expires': 100000
                }
            })
        }).then(function() {
            return ch.bindQueue('DEQ', 'DeadExchange', '');
        }).then(function() {
            console.log('Sending delayed message');

            return ch.publish('DeadExchange', '', Buffer.from("Over the Hills and Far Away!"));
        });
    })
}).then(null, function(error) {
    console.log('error\'ed')
    console.log(error);
    console.log(error.stack);
});