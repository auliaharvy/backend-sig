const express = require('express');
const router = express.Router();
const userHasRoleHandler = require('./handler/user-has-role');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', userHasRoleHandler.create);
router.get('/:id', userHasRoleHandler.getUserHasRole);

module.exports = router;