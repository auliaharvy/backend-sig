const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        var sjp;
        // //(req)
        if(req.query.truck) {
            sjp = await api.get(`/api/sjps?from=${req.query.from}&to=${req.query.to}&truck=${req.query.truck}`, req.headers);
        } else {
            sjp = await api.get(`/api/sjps?from=${req.query.from}&to=${req.query.to}`, req.headers);
        }
        return res.json(sjp.data);
    } catch (error) {
        //(error);
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