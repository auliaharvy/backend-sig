const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const palletTransfer = await api.patch(`/api/pallet-transfers/${id}`, req.body, req.headers);
        return res.json(palletTransfer.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        if (error.code === "ECONNABORTED") {
            return res.status(500).json({
                status: 'error',
                message: 'timeout of 10000ms exceeded'
            })
        }

        const {
            status,
            data
        } = error.response;
        return res.status(status).json({
            status: status,
            message: data
        });
    }
}