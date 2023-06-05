const express = require('express');
const router = express.Router();
const apiExternalHandler = require('./handler/api-external');
const verifyToken = require('../middlewares/verifyToken');

router.post('/truck', apiExternalHandler.truck);
router.post('/do', apiExternalHandler.dataDo);
// router.get('/', verifyToken, companyHandler.getAll);
// router.get('/', claimPalletHandler.getAll);
// router.get('/:id', claimPalletHandler.getDetail);
// router.patch('/:id', claimPalletHandler.update);
// router.delete('/:id', claimPalletHandler.destroy);

module.exports = router;