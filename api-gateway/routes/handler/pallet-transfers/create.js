const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        const palletTransfer = await api.post('api/pallet-transfers', req.body, req.headers);
        return res.json(palletTransfer.data);
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