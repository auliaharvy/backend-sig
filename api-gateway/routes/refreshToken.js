const express = require('express');
const router = express.Router();
const refreshTokenHandler = require('./handler/refresh-token');

/* GET users listing. */
router.post('/', refreshTokenHandler.refreshToken);

module.exports = router;
