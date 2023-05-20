const express = require('express');
const router = express.Router();
const newPalletHandler = require('./handler/new-pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', newPalletHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', newPalletHandler.getAll);
router.get('/:id', newPalletHandler.getDetail);
router.patch('/:id', newPalletHandler.update);
router.delete('/:id', newPalletHandler.destroy);

module.exports = router;