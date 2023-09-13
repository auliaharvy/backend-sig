const apiAdapter = require('../../apiAdapter');
const {
    URL_API_SIG
} = process.env;
const logger = require('../../../lib/logger');


const api = apiAdapter(URL_API_SIG);
const FormData = require('form-data');

module.exports = async (req, res) => {
    try {
        var bodyFormData = new FormData();
        bodyFormData.append('token', req.body.token);
        bodyFormData.append('X_TGL1', req.body.X_TGL1);
        bodyFormData.append('X_TGL2', req.body.X_TGL2);
        bodyFormData.append('X_VKORG', req.body.X_VKORG);
        bodyFormData.append('X_NOPOLISI', req.body.X_NOPOLISI);
        //const data = await api.post(`/sdonline/service/get_realisasi.php`, bodyFormData ,req.headers);
	const data = await api.post(`/csms/sdonline/service/get_realisasi`, bodyFormData ,req.headers);
        return res.json(data.data);
    } catch (error) {
        //(error);
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }
        console.log(error)
        // const {
        //     data
        // } = error.response;
        const response = {
            message: 'Terjadi kesalahan, silakan coba lagi'
        } 
        return res.status(400).json(response);
    }
}
