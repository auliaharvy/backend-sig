const express = require('express');
const router = express.Router();
const userHandler = require('./handler/users');
const verifyToken = require('../middlewares/verifyToken');
/* GET users listing. */
router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.put('/', userHandler.update);
router.get('/:id', userHandler.getUser);
router.get('/', userHandler.getAll);
router.delete('/:id', userHandler.deleteUser);
router.post('/logout', userHandler.logout);
module.exports = router;