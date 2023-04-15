const express = require('express');
const router = express.Router();
const companyHandler = require('./handler/companies');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', companyHandler.create);
// router.get('/', verifyToken, companyHandler.getAll);
router.get('/', companyHandler.getAll);
router.get('/:id', companyHandler.getCompany);
router.patch('/:id', companyHandler.update);
router.delete('/:id', companyHandler.destroy);

module.exports = router;