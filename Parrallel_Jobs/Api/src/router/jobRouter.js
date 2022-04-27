const express = require('express');
const router = new express.Router();
const Job = require('../models/jobModel');
const createButches = require('../rabbitMq/rabbitMq')

const amqp = require("amqplib");

// get count of jobs
router.get('/', async (req, res) => {
    res.send('started to work')
    try {
        const count = await Job.count({});
        console.log(count)
        let butches = [];
        let index = 0;
        while (index < count) {
            butches.push(index);
            index = index + 100;
        }
        createButches(butches)

        // for (i = 1001; i < 1000000; i + 1000) {
        //     const jobs = await createJobs();
        //     await Job.insertMany(jobs).then(() => {
        //         console.log('saved, ', jobs.length)
        //     })
        // }

    } catch (err) {
        res.status(500).send()
    }
})

// async function createJobs() {
//     const jobs = []
//     for (i = 0; i < 1000; i++) {
//         jobs.push(new Job({ number: i }))
//     }
//     return jobs;
// }


module.exports = router

