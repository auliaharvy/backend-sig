const express = require('express');
const router = express.Router();
const driverHandler = require('./handler/drivers');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', driverHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', driverHandler.getAll);
router.get('/:id', driverHandler.getDriver);
router.patch('/:id', driverHandler.update);
router.delete('/:id', driverHandler.destroy);

module.exports = router;