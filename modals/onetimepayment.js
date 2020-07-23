const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oneTimePaymentSchema = new Schema({
   amount:{
       type:Number,
       required:true,
       trim:true
   },
   subscriptionType:{
      type:String,
      required:true,
      trim:true
   },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Onetimepayment', oneTimePaymentSchema)