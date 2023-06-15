const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_MASTER
} = process.env;

const api = apiAdapter(URL_SERVICE_MASTER);

module.exports = async (req, res) => {
    try {
        const company = await api.get(`/api/companies`, req.headers);
        console.log(company)
        return res.json(company.data);
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