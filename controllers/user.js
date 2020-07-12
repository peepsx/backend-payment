const Userpayment = require('../modals/user')
const config = require('../config')
const stripe = require('stripe')(config.Secret_Key)
const service = require('./service');

class Users {
    userpayment(req, res) {
        const { fName, lName, addressOne, addressTwo, city, state, zipcode, country, phoneNo, accountemail, token } = req.body;
        Userpayment.findOne({ email: accountemail }).then(result => {
            if (result) {
                res.status(200).json({ "status": false, "message": "User already exits.", "data": "" });
            } else {
                service.createSubcription(accountemail, token).then(resultData => {
                    let userObject = new Userpayment({
                        fName: fName,
                        lName: lName,
                        addressOne: addressOne,
                        addressTwo: addressTwo,
                        city: city,
                        state: state,
                        zipcode: zipcode,
                        country: country,
                        phoneNo: phoneNo,
                        email: accountemail,
                        stripeCustId: resultData.customer,
                        subscriptionId: resultData.id,
                        subscriptionStatus: resultData.status
                    });
                    userObject.save().then(doc => {
                        if (doc) {
                            res.json({ status: true, message: "Subscription created successfully."})
                        } else {
                            res.json({ status: false, message: "Subscription not created,Please try again"})
                        }
                    }).catch((error) => {
                        res.json({ "status": false, "message": "Internal server error.", "data": error })
                    })
                }).catch((error1)=>{
                    if(error1.Error){
                        res.status(501).json({status:false,message:error1.Error})
                    }else if(error1.raw.message){
                        res.status(501).json({status:false,message:error1.raw.message})
                    }else{
                        res.json({ "status": false, "message": "Internal server error.", "data": error })
                    }
                })
            }
        })
    }


}

module.exports = new Users()