const rateLimit = require('express-rate-limit');
const logger = require('../lib/logger');

const requestRateLimiter = rateLimit({
  windowMs: 1000,
  max: 20,
  message: "Anda telah mencapai maximal request dalam 1 detik, silakan coba kembali dalam 5 menit", 
  statusCode: 429,
  delayMs: 5 * 60 * 1000,
  delayMs: 0,
        handler: (req, res) => {
            res.format({
                json: () => {
                    res.status(429).json({
                        message: 'You have made too many attempts in a short period of time, please try later'
                    });
                }
            });
        },
        onLimitReached: (req, res, options) => {
            logger.error(options.message)
            // logger.error(options.message, resolveLogger({
            //     reqURL: req.url,
            //     statusCode: options.statusCode
            // }));
        }
});
module.exports = { requestRateLimiter }