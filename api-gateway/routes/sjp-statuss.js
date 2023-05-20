const express = require('express');
const router = express.Router();
const sjpStatusHandler = require('./handler/sjp-statuss');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', sjpStatusHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', sjpStatusHandler.getAll);
router.get('/:id', sjpStatusHandler.getSjpStatus);
router.patch('/:id', sjpStatusHandler.update);
router.delete('/:id', sjpStatusHandler.destroy);

module.exports = router;