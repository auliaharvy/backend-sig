

const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_REPORTING
} = process.env;

const api = apiAdapter(URL_SERVICE_REPORTING);

module.exports = async (req, res) => {
    try {
        // const id = req.params.id;
        const data = await api.get(`/api/dashboards/detail-pallet?type=` + req.query.type, req.headers);
        return res.json(data.data);
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