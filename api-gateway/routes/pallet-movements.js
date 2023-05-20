const express = require('express');
const router = express.Router();
const palletMovementHandler = require('./handler/pallet-movements');
const verifyToken = require('../middlewares/verifyToken');

// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', palletMovementHandler.getAll);

module.exports = router;