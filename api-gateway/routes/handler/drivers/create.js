const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_MASTER
} = process.env;
const logger = require('../../../lib/logger');

const api = apiAdapter(URL_SERVICE_MASTER);

module.exports = async (req, res) => {
    try {
        const driver = await api.post('api/drivers', req.body);
        const logMessage = driver.status + '-' + driver.config.method +': ' + driver.config.baseURL + driver.config.url;
        logger.info(logMessage);
        return res.json(driver.data);
    } catch (error) {
        logger.error(error);
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        const {
            status,
            data
        } = error.response;
        return res.status(status).json(data);
    }
}