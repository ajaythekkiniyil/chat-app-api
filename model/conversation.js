const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    participants: {
        type: Array,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('conversation', conversationSchema)