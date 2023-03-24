var express = require('express');
var router = express.Router();
const refreshTokenHandler = require('../controller/refresh-token');

/* GET users listing. */
router.get('/re', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/refresh", refreshTokenHandler.getToken);

module.exports = router;
