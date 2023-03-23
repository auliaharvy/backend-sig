var express = require('express');
var router = express.Router();
const refreshTokenHandler = require('./handler/refresh-token');

router.post('/', refreshTokenHandler.create)
router.get('/', refreshTokenHandler.getToken)
/* GET users listing. */


module.exports = router;
