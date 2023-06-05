const express = require('express');
const router = express.Router();
const transporterAdjusmentHandler = require('./handler/transporter-adjusments');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', transporterAdjusmentHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', transporterAdjusmentHandler.getAll);
router.get('/export', transporterAdjusmentHandler.exportData);
router.get('/:id', transporterAdjusmentHandler.getDetail);
router.patch('/:id', transporterAdjusmentHandler.update);
router.delete('/:id', transporterAdjusmentHandler.destroy);

module.exports = router;