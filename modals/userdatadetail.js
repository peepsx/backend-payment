const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userdatadetail = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('userdatadetail', userdatadetail)