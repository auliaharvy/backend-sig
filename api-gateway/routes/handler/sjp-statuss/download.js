const apiAdapter = require('../../apiAdapter');
const root = require('rootrequire');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        console.log(req.params);
        console.log(root + req.params.sending_driver_approval);
        res.download(root + req.params.sending_driver_approval);
    } catch (error) {

        console.log(error);

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