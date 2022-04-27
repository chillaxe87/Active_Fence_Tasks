require('dotenv').config()
const express = require('express')
const rmq = require('./db/rabbitMq')

const port = 3002
const app = express()

app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection

db.on('error', error => console.log(error))


app.listen(port, async () => {
    db.once('open', () => {
        console.log("Connected to mongoose")
        rmq.pullBatches()
    })
    console.log('Server is up on port', port)

})