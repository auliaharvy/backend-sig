const express = require('express');
const router = express.Router();
const palletHandler = require('./handler/pallets');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', palletHandler.create);
// router.get('/', verifyToken, palletHandler.getAll);
router.get('/', palletHandler.getAll);
router.get('/:id', palletHandler.getPallet);
router.patch('/:id', palletHandler.update);
router.delete('/:id', palletHandler.destroy);

module.exports = router;