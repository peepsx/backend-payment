var express = require('express');
var router = express.Router();
var controller = require('../controllers/user')

/* GET users listing. */
router.post('/payment',controller.userpayment );
router.post('/saveuser',controller.saveuser)

module.exports = router;
