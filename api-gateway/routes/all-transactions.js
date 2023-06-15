const express = require('express');
const router = express.Router();
const allTransactionHandler = require('./handler/all-transactions');
const verifyToken = require('../middlewares/verifyToken');

// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', allTransactionHandler.getAll);

module.exports = router;