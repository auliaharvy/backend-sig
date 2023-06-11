const express = require('express');
const router = express.Router();
const sjpHandler = require('./handler/sjps');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', sjpHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', verifyToken,sjpHandler.getAll);
router.get('/export', sjpHandler.exportData);
router.get('/:id', sjpHandler.getSjp);
router.patch('/:id', sjpHandler.update);
router.delete('/:id', sjpHandler.destroy);

module.exports = router;