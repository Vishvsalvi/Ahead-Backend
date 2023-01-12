const mongoose = require('mongoose')

const annoucementSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        minLen: 2
    },
    title: {
        type: String,
        required: true,
        minLen: 2
    }
})

module.exports = mongoose.model("annoucementModel", annoucementSchema);