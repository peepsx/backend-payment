const Userpayment = require('../modals/user')
const config = require('../config')
const stripe = require('stripe')(config.Secret_Key)
const service = require('./service');

class Users {
    userpayment(req, res) {
        console.log("body", req.body);
        const { name, token } = req.body;
        // console.log("res.body=========",res.body)
        service.createSubcription(name, token).then(resultData => {
            if (resultData) {
                console.log("payment result data ============ >>>> ", resultData)
                res.json({ status: true, message: "Payment successful.",data:resultData })
            }
        }).catch((error1) => {
            if (error1.Error) {
                res.status(501).json({ status: false, message: error1.Error })
            } else if (error1.raw.message) {
                res.status(501).json({ status: false, message: error1.raw.message })
            } else {
                res.json({ "status": false, "message": "Internal server error.", "data": error })
            }
        })
    }

    saveuser(req, res) {
        const { fName, lName, addressOne, addressTwo, city, state, zipcode, country, phoneNo, email, paymenttype, subscriptionId, subscriptionStatus } = req.body
        Userpayment.findOne({ email: email }).then((resp) => {
            if (resp) {
                console.log('=====================res',resp)
                res.status(201).json({status:false,message:"User already exists"})
            } else {
                console.log(resp, '=====================res =elsecase',req.body)
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
                        email: email,
                        paymentType: paymenttype,
                        subscriptionId: subscriptionId,
                        subscriptionStatus: subscriptionStatus
                    });
                    userObject.save().then(doc => {
                        if (doc) {
                            res.json({ status: true, message: "You are member now."})
                        } else {
                            res.json({ status: false, message: "You are not member,Please try again"})
                        }
                    }).catch((error) => {
                        console.log(error)
                        res.json({ "status": false, "message": "Internal server error.", "data": error })
                    })
        

            }
        }).catch((err) => {
            console.log('=========', err)
        })

    }

}

module.exports = new Users()