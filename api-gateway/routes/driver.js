const express = require('express');
const router = express.Router();
const driverHandler = require('./handler/driver');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', driverHandler.create);
router.get('/',driverHandler.getAll);
router.delete('/:id', driverHandler.destroy);

module.exports = router;
