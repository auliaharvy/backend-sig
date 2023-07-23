const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');

const {
    JWT_SECRET
} = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(
        token, JWT_SECRET, function(err, decoded) {
            if(err) {
                // console.log(req.query);
                console.log(err)   
                logger.error(err);
                return res.status(403).json({ 
                    code: 403,
                    status: 'Unauthenticated',
                    message: 'Token expired, silakan login kembali' 
                });
            }
            req.user = decoded;
            return next();
        }
    )
}