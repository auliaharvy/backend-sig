const apiAdapter = require('../../apiAdapter');
const {
    URL_API_SIG
} = process.env;

const api = apiAdapter(URL_API_SIG);

module.exports = async (req, res) => {
    try {
        const data = await api.post(`/dev/sd/sdonline/service/sinkronTruck.php`, req.body, req.headers);
        return res.json(data.data);
    } catch (error) {
        console.log(error);
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        const response = {
            message: 'no connection to API'
        } 
        return res.status(500).json(response);
    }
}