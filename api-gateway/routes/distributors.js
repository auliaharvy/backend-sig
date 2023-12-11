const express = require('express');
const router = express.Router();
const distributorHandler = require('./handler/distributors');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', distributorHandler.create);
// router.get('/', verifyToken, distributorHandler.getAll);
router.get('/', distributorHandler.getAll);
router.get('/:id', distributorHandler.getDistributor);
router.patch('/:id', distributorHandler.update);
router.delete('/:id', distributorHandler.destroy);

module.exports = router;