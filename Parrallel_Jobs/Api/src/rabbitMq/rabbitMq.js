const amqp = require("amqplib");

async function createButches(butches) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        // channel.sendToQueue('jobs', Buffer.from(JSON.stringify(number)))
        butches.forEach(butch => {
            console.log(butch)
            channel.sendToQueue('batches', Buffer.from(JSON.stringify(butch)))
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = createButches