const express = require('express');
const router = express.Router();
const claimPalletHandler = require('./handler/claim-pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', claimPalletHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', claimPalletHandler.getAll);
router.get('/export', claimPalletHandler.exportData);
router.get('/:id', claimPalletHandler.getDetail);
router.patch('/:id', claimPalletHandler.update);
router.delete('/:id', claimPalletHandler.destroy);

module.exports = router;