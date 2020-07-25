const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oneTimePaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    subscriptionType: {
        type: String,
        required: true,
        trim: true
    },
    subscriptionId: {
        type: String,
        required: true,
        trim: true
    },
    transectionId: {
        type: String,
        required:true,
        trim: true
    },
    paid: {
        type: Boolean,
        trim: true
    },
    paymentStatus: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Onetimepayment', oneTimePaymentSchema)