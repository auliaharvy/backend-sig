const express = require('express');
const router = express.Router();
const sewaPalletHandler = require('./handler/sewa-pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', sewaPalletHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', sewaPalletHandler.getAll);
router.get('/:id', sewaPalletHandler.getDetail);
router.patch('/:id', sewaPalletHandler.update);
router.delete('/:id', sewaPalletHandler.destroy);

module.exports = router;