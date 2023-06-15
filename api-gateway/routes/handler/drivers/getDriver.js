const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_MASTER
} = process.env;
const logger = require('../../../lib/logger');

const api = apiAdapter(URL_SERVICE_MASTER);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const driver = await api.get(`/api/drivers/${id}`, req.headers);
        const logMessage = driver.status + '-' + driver.config.method +': ' + driver.config.baseURL + driver.config.url+'/'+id;
        logger.info(logMessage);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Success query drivers',
            data: driver.data.data
        })
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