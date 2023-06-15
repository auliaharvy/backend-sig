const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_MASTER
} = process.env;

const api = apiAdapter(URL_SERVICE_MASTER);

module.exports = async (req, res) => {
    try {
        const driver = await api.get(`/api/drivers`, req.headers);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Success query drivers',
            data: driver.data.data
        })
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