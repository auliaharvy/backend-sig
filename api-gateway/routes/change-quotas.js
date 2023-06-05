const express = require('express');
const router = express.Router();
const changeQuotaHandler = require('./handler/change-quotas');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', changeQuotaHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', changeQuotaHandler.getAll);
router.get('/export', changeQuotaHandler.exportData);
router.get('/:id', changeQuotaHandler.getDetail);
router.patch('/:id', changeQuotaHandler.update);
router.delete('/:id', changeQuotaHandler.destroy);

module.exports = router;