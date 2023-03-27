const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_DRIVER
} = process.env;

const api = apiAdapter(URL_SERVICE_DRIVER);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const media = await api.delete(`/api/drivers/${id}`);
        return res.json(media.data);
    } catch (error) {

        if(error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}