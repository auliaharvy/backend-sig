const apiAdapter = require('../../apiAdapter');
const {
    URL_API_SIG
} = process.env;

const api = apiAdapter(URL_API_SIG);

module.exports = async (req, res) => {
    try {
        console.log(req.body)
        const data = await api.post(`/dev/sd/sdonline/service/get_realisasi.php`, req.body);
        return res.json(data.data);
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