const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    addressOne: {
        type: String,
        required: true,
        trim: true
    },
    addressTwo: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    zipcode: {
        type: Number,
        required: true,
        trim: true
    },
    // country: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    phoneNo: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    // amount: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    paymentType: {
        type: String,
        default: null,
        trim: true
    },
    subscriptionId: {
        type: String,
        default: null
    },
    subscriptionStatus: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Userpayment', userSchema)