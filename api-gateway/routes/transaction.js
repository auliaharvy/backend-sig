const express = require('express');
const router = express.Router();
const transactionHandler = require('./handler/transaction');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', transactionHandler.create);
router.get('/',transactionHandler.getAll);
router.delete('/:id', transactionHandler.destroy);

module.exports = router;
