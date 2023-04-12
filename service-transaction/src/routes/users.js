var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  data = { "msg" : "Hi to Transaction Service Docker"};
  res.type("json");
  res.status(200).send(data);
});

module.exports = router;
