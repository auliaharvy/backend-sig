const express = require('express');
const router = express.Router();
const berMissingPalletHandler = require('./handler/ber-missing-pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', berMissingPalletHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', berMissingPalletHandler.getAll);
router.get('/export', berMissingPalletHandler.exportData);
router.get('/:id', berMissingPalletHandler.getDetail);
router.patch('/:id', berMissingPalletHandler.update);
router.delete('/:id', berMissingPalletHandler.destroy);

module.exports = router;