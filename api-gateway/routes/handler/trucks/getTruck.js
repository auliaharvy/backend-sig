const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_MASTER
} = process.env;

const api = apiAdapter(URL_SERVICE_MASTER);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const truck = await api.get(`/api/trucks/${id}`);
        return res.json(truck.data);
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