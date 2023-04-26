const express = require('express');
const router = express.Router();
const userHandler = require('./handler/users');
const verifyToken = require('../middlewares/verifyToken');
/* GET users listing. */
router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.put('/', verifyToken, userHandler.update);
router.get('/:id', verifyToken, userHandler.getUser);
router.get('/', verifyToken, userHandler.getAll);
router.delete('/:id', verifyToken, userHandler.deleteUser);
router.post('/logout', verifyToken, userHandler.logout);
module.exports = router;