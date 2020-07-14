const Userpayment = require('../modals/user')
const config = require('../config')
const stripe = require('stripe')(config.Secret_Key)
const service = require('./service');
const Payment = require('../modals/payment')
const Paypalpayment = require('../modals/paypalpayment')
const { validationResult } = require('express-validator')

// const sendgrid = require('@sendgrid/mail');
// sendgrid.setApiKey(SENDGRID_API_KEY);



class Users {
    userpayment(req, res) {
        const errorss = validationResult(req);
        if (!errorss.isEmpty()) {
            errorss.array().map(element => {
                return res.status(201).json({ status: false, message: element.msg })
            }).join(',')
        }
        console.log("body", req.body);
        const { name, token } = req.body;
        service.createSubcription(name, token).then(resultData => {
            if (resultData) {
                console.log("payment result data ============ >>>> ", resultData.id, resultData.created, '======', resultData)
                Payment.find().then((response) => {
                    let paymentObject = new Payment({
                        name: name,
                        token: token,
                        subscriptionId: resultData.id,
                        created: resultData.created
                    })
                    paymentObject.save().then((respData) => {
                        console.log("saved");
                        res.json({ status: true, message: "Payment successful.", data: resultData })

                    }).catch((error) => {
                        console.log(error)
                    })

                }).catch((error2) => {
                    console.log(error2)
                })
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
        const errorss = validationResult(req);
        if (!errorss.isEmpty()) {
         errorss.array().map(element => {
                return res.status(201).json({ status: false, message: element.msg })
            }).join(',')
        }
        const { fName, lName, addressOne, addressTwo, city, state, zipcode, country, phoneNo, email, paymenttype, subscriptionId, subscriptionStatus } = req.body
        Userpayment.findOne({ email: email }).then((resp) => {
            if (resp) {
                console.log('=====================res', resp)
                res.status(201).json({ status: false, message: "User already exists" })
            } else {
                console.log(resp, '=====================res =elsecase', req.body)
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
                        res.json({ status: true, message: "You are member now." })
                        // construct an email
                        // const email = {
                        //     to: 'test@mailslurp.com',
                        //     from: 'test@mailslurp.com',
                        //     subject: 'My first email',
                        //     text: 'Hello world',
                        // }
                        // sendgrid.send(email)
                    } else {
                        res.json({ status: false, message: "You are not member,Please try again" })
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

    paypalpayment(req, res) {
        const errorss = validationResult(req);
        if (!errorss.isEmpty()) {
            errorss.array().map(element => {
                return res.status(201).json({ status: false, message: element.msg })
            }).join(',')
        }
        const { orderID, billingToken, subscriptionID, facilitatorAccessToken, } = req.body
        Paypalpayment.find()
            .then((docs) => {
                let paypalpaymentObj = new Paypalpayment({
                    orderID: orderID,
                    billingToken: billingToken,
                    subscriptionID: subscriptionID,
                    facilitatorAccessToken: facilitatorAccessToken
                });
                paypalpaymentObj.save()
                    .then((docsResult) => {
                        if (docsResult) {
                            res.json({ status: true, message: 'Data saved successfully' })
                        } else {
                            res.json({ status: false, message: 'Data not saved,try again' })
                        }
                    })
                    .catch((errs) => {
                        console.log(errs)
                    })

            })
            .catch((errors) => {
                console.log(errors)
            })
    }

}

module.exports = new Users()