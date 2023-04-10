const express = require('express');
const router = express.Router();
const employeeHandler = require('./handler/employee');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', employeeHandler.create);
router.get('/', verifyToken, employeeHandler.getAll);
router.delete('/:id', employeeHandler.destroy);
router.get('/hello', verifyToken, function (req, res) {
    res.send("Hi to User");
});

module.exports = router;