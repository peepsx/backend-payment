const { check } = require('express-validator');

class Validation{
    validate(params){
        switch(params){

            case "stripePayment":
                return[
                    check('subscriptionId')
                    .notEmpty()
                    .withMessage('Enter subscriptionId name')
                    .isString()
                    .withMessage('Enter correct subscriptionId name')
                    .trim(),
                    
                ]

                case "paypalPayment":
                return[
                    check('productName')
                    .notEmpty()
                    .withMessage('Enter product name')
                    .isString()
                    .withMessage('Enter correct product name')
                    .trim()
                ]

                case "userDetails":
                    return[
                        check('')
                    ]

        }

    }
}

module.exports = new Validation();