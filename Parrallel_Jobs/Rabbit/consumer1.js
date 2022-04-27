const amqp = require("amqplib");
let jobsDone = 0;
connect();

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())
            jobsDone++;
            console.log(`job: ${input.number}, jobs completed${jobsDone}`)
            channel.ack(message);
        })

        console.log('waiting for messages')
    } catch (err) {
        console.log(err)
    }
}
