const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const sjp = await api.get(`/api/sjps/${id}`, req.headers);
        return res.json(sjp.data);
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