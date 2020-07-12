"use strict"
const promise= require('promise');
const config = require('../config')
const stripe = require('stripe')(config.Secret_Key);

class Service{
    constructor(){}




    createSubcription(userEmail, cardToken,) {
        console.log("create subscription ================ ",userEmail,cardToken)
        return new promise((resolve, reject) => {
            stripe.customers.create(
                {
                    email: userEmail,
                    source: cardToken
                },
                function (err, customer) {
                    if (customer) {
                        resolve(customer)
                    } else {
                        reject(err)
                    }
                }
            );
        }).then(resultData => {
            return new promise((resolve, reject) => {
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
            })
        })
    }

}

module.exports=new Service();