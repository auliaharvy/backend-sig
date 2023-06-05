const express = require('express');
const router = express.Router();
const damagedPalletHandler = require('./handler/damaged-pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', damagedPalletHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', damagedPalletHandler.getAll);
router.get('/export', damagedPalletHandler.exportData);
router.get('/:id', damagedPalletHandler.getDetail);
router.patch('/:id', damagedPalletHandler.update);
router.delete('/:id', damagedPalletHandler.destroy);

module.exports = router;