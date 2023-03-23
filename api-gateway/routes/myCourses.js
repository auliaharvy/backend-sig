const express = require('express');
const router = express.Router();
const mycoursesHandler = require('./handler/my-courses');



/* GET users listing. */
router.post('/',mycoursesHandler.create);
router.get('/',mycoursesHandler.get);

module.exports = router;