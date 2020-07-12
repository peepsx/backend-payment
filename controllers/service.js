"use strict"
const promise= require('promise');
const config = require('../config');
const { reject } = require('promise');
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
                 customer ? resolve(customer) : resolve(JSON.parse(JSON.stringify(err)));
                }
            );
        }).then(resultData => {
            return new promise((resolve, reject) => {
                if(resultData.id){
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
                }else{
                 reject(resultData)
                }
            })
        })
    }

}

module.exports=new Service();