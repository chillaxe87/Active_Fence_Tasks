const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        number: { type: Number }
    }
)

const Job = mongoose.model('Tasks', taskSchema);

module.exports = Job;