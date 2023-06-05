const express = require('express');
const router = express.Router();
const palletTransferHandler = require('./handler/pallet-transfers');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', palletTransferHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', palletTransferHandler.getAll);
router.get('/export', palletTransferHandler.exportData);
router.get('/:id', palletTransferHandler.getPalletTransfer);
router.patch('/:id', palletTransferHandler.update);
router.delete('/:id', palletTransferHandler.destroy);

module.exports = router;