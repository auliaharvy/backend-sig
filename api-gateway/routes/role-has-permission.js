const express = require('express');
const router = express.Router();
const roleHasPermission = require('./handler/role-has-permission');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', roleHasPermission.create);
router.get('/:id', roleHasPermission.getRoleHasPermission);

module.exports = router;