"use strict"
const promise = require('promise');
const config = require('../config');
const { reject } = require('promise');
const stripe = require('stripe')(config.Secret_Key);
// const nodemailer = require("nodemailer");
var fs = require('fs');
const ejs = require("ejs");
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.API_Key_ID);


// Create a SMTP transporter object
// let transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'kumarujjawal786@gmail.com',
//         pass:'9431627625'
//     }
// });

class Service {
    constructor() { }




    createSubcription(name, cardToken,) {
        // console.log("create subscription ================ ",userEmail,cardToken)
        return new promise((resolve, reject) => {
            stripe.customers.create(
                {
                    name: name,
                    source: cardToken
                },
                function (err, customer) {
                    customer ? resolve(customer) : resolve(JSON.parse(JSON.stringify(err)));
                }
            );
        }).then(resultData => {
            return new promise((resolve, reject) => {
                if (resultData.id) {
                    stripe.subscriptions.create(
                        {
                            customer: resultData.id,
                            items: [
                                { price: config.SUBSCRIPTION_PRICE },
                            ],
                        },
                        function (err, subscription) {
                            subscription ? resolve(subscription) : reject(err);
                        }
                    );
                } else {
                    reject(resultData)
                }
            })
        })
    }

    sendmail(data) {

        return new promise((resolve, reject) => {

            ejs.renderFile(__dirname + "/views/emailtemplate.ejs", function (err, datas) {
                if (err) {
                    console.log(err);
                } else {
                    const email = {
                        to: data.email,
                        from: 'noreply@peepsx.com',
                        subject: data.subject,
                        html: datas
                    }
                    // console.log("html data ======================>", mainOptions.html);

                    sendgrid.send(email, function (err, info) {
                        if (err) {
                            console.log('====>>>>>>>>>>', err)
                            resolve(false)
                        } else {
                            console.log('success', info)
                            resolve(info)
                        }
                    });
                }
            });
        })



        // ejs.renderFile(__dirname + "/views/emailtemplate.ejs", function (err, data) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         var mainOptions = {
        //             from: 'kumarujjawal786@gmail.com',
        //             to: 'mku6818@gmail.com',
        //             subject: 'Account Activated',
        //             html: data
        //         };
        //         // console.log("html data ======================>", mainOptions.html);

        //         transporter.sendMail(mainOptions, function (err, info) {
        //           if (err) {
        //               console.log('====>>>>>>>>>>',err)
        //             res.json({
        //               msg: 'fail'
        //             })
        //           } else {
        //               console.log('success')
        //             res.json({
        //               msg: 'success'
        //             })
        //           }
        //       });
        //       }
        //   });


        // return new promise ((resolve,reject)=>{

        //     // send mail with defined transport object
        //      transporter.sendMail({
        //         from: 'kumarujjawal786@gmail.com', // sender address
        //         to: 'shikhars371@gmail.com', // list of receivers
        //         subject: data.subject, // Subject line
        //        // text: "hii checking ,message to send to user", // plain text body
        //         html: "<p>hii checking ,message to send to user</p>", // html body
        //     }).then(result=>{
        //         if(result){
        //             resolve(result);
        //         }else{
        //             resolve(false)
        //         }
        //     })


        // console.log("Message sent: %s", info);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


        // })
    }


}

module.exports = new Service();