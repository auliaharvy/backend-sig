const express = require('express');
const router = express.Router();
const truckHandler = require('./handler/trucks');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', truckHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', truckHandler.getAll);
router.get('/:id', truckHandler.getTruck);
router.patch('/:id', truckHandler.update);
router.delete('/:id', truckHandler.destroy);

module.exports = router;