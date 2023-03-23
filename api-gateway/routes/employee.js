const express = require('express');
const router = express.Router();
const employeeHandler = require('./handler/employee');

/* GET users listing. */
router.post('/', employeeHandler.create);
router.get('/', employeeHandler.getAll);
router.delete('/:id', employeeHandler.destroy);

module.exports = router;
