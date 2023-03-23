const express = require('express');
const router = express.Router();
const lessonsHandler = require('./handler/lessons');



/* GET users listing. */
router.post('/', lessonsHandler.create);
router.put('/:id', lessonsHandler.update);
router.get('/', lessonsHandler.getAll);
router.get('/:id', lessonsHandler.get);
router.delete('/:id',lessonsHandler.destroy);

module.exports = router;