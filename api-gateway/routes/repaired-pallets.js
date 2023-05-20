const express = require('express');
const router = express.Router();
const repairedPalletHandler = require('./handler/repaired-pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', repairedPalletHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', repairedPalletHandler.getAll);
router.get('/:id', repairedPalletHandler.getDetail);
router.patch('/:id', repairedPalletHandler.update);
router.delete('/:id', repairedPalletHandler.destroy);

module.exports = router;