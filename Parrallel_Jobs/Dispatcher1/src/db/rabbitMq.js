const amqp = require("amqplib");
const Job = require('../models/jobModel');

let connection;
let channel;
async function pullBatches() {
    try {
        connection = await amqp.connect('amqp://localhost:5672')
        channel = await connection.createChannel();
        const result = await channel.assertQueue("batches");
        console.log(result)
        channel.consume("batches", async message => {
            const input = JSON.parse(message.content.toString())
            channel.ack(message);
            await getJobs(100, input)
        })
        console.log('waiting for messages')
    } catch (err) {
        console.log(err)
    }
}

async function pushJobsToQueue(jobs) {
    try {
        // const connection = await amqp.connect('amqp://localhost:5672')
        // const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        jobs.forEach(job => {
            channel.sendToQueue('jobs', Buffer.from(JSON.stringify(job)))
            console.log('sent the job:', job)
        });

    } catch (err) {
        console.log(err)
    }
}
async function getJobs(butchSize, startingPoint) {
    try {
        const jobs = await Job.find({}, null, { limit: butchSize, skip: startingPoint });
        if (!!jobs) {
            await pushJobsToQueue(jobs)
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { pullBatches }