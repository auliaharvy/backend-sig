const express = require('express');
const router = express.Router();
const palletRealizationHandler = require('./handler/pallet-realizations');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', palletRealizationHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', palletRealizationHandler.getAll);
router.get('/export', palletRealizationHandler.exportData);
router.get('/:id', palletRealizationHandler.getDetail);
router.patch('/:id', palletRealizationHandler.update);
router.delete('/:id', palletRealizationHandler.destroy);

module.exports = router;