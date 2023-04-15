const express = require('express');
const router = express.Router();
const roleHandler = require('./handler/roles');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', roleHandler.create);
// router.get('/', verifyToken, roleHandler.getAll);
router.get('/', roleHandler.getAll);
router.get('/:id', roleHandler.getRole);
router.patch('/:id', roleHandler.update);
router.delete('/:id', roleHandler.destroy);

module.exports = router;