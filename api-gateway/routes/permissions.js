const express = require('express');
const router = express.Router();
const permissionHandler = require('./handler/permissions');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', permissionHandler.create);
// router.get('/', verifyToken, roleHandler.getAll);
router.get('/', permissionHandler.getAll);
router.get('/:id', permissionHandler.getPermission);
router.patch('/:id', permissionHandler.update);
router.delete('/:id', permissionHandler.destroy);

module.exports = router;