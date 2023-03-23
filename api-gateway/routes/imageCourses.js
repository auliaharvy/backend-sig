const express = require('express');
const router = express.Router();
const imagecoursesHandler = require('./handler/image-courses');



/* GET users listing. */
router.post('/', imagecoursesHandler.create);
router.put('/:id', imagecoursesHandler.update);
router.get('/', imagecoursesHandler.getAll);
router.get('/:id', imagecoursesHandler.get);
router.delete('/:id',imagecoursesHandler.destroy);

module.exports = router;