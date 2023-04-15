const express = require('express');
const router = express.Router();
const companytypeHandler = require('./handler/company-types');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', companytypeHandler.create);
// router.get('/', verifyToken, companytypeHandler.getAll);
router.get('/', companytypeHandler.getAll);
router.get('/:id', companytypeHandler.getCompanyType);
router.patch('/:id', companytypeHandler.update);
router.delete('/:id', companytypeHandler.destroy);

module.exports = router;