if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const jobRouter = require('./router/jobRouter')

const port = 3000
const app = express()

app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log("Connected to mongoose"))
app.use('/', jobRouter)

app.listen(port, () => {
    console.log('Server is up on port', port)
})