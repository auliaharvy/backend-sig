const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        const sjp = await api.post('api/sjps', req.body, req.headers);
        return res.json(sjp.data);
    } catch (error) {

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