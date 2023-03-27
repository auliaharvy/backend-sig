const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_DRIVER
} = process.env;

const api = apiAdapter(URL_SERVICE_DRIVER);

module.exports = async (req, res) => {
    try {
        const employee = await api.get('/api/drivers');
        return res.json(employee.data);
    } catch (error) {
        console.log(error);
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