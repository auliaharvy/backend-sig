var express = require('express');
var router = express.Router();
const orderPaymentHandler = require('./handler/order-payment');

const verifyToken = require('../middlewares/verifyToken');

/* GET users listing. */
router.get('/', orderPaymentHandler.getOrder);

module.exports = router;
