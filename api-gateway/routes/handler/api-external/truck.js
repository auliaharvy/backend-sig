const apiAdapter = require('../../apiAdapter');
const {
    URL_API_SIG
} = process.env;

const api = apiAdapter(URL_API_SIG);

module.exports = async (req, res) => {
    try {
        //const data = await api.post(`/sdonline/service/sinkronTruck.php`, req.body, req.headers);
	const data = await api.post(`/csms/sdonline/service/sinkrontruck`, req.body, req.headers);
        return res.json(data.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        console.log(error)
        const response = {
            message: 'Terjadi Kesalahan, silakan coba lagi'
        } 
        return res.status(400).json(response);
    }
}
