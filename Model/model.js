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
}, {
    timestamps: true

}
)

module.exports = mongoose.model("annoucementModel", annoucementSchema);