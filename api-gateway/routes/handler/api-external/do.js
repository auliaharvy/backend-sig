const apiAdapter = require('../../apiAdapter');
const {
    URL_API_SIG
} = process.env;

const api = apiAdapter(URL_API_SIG);
const FormData = require('form-data');

module.exports = async (req, res) => {
    try {
        console.log(req)
        var bodyFormData = new FormData();
        bodyFormData.append('token', req.body.token);
        bodyFormData.append('X_TGL1', req.body.X_TGL1);
        bodyFormData.append('X_TGL2', req.body.X_TGL2);
        bodyFormData.append('X_WERKS', req.body.X_WERKS);
        bodyFormData.append('X_VKORG', req.body.X_VKORG);
        bodyFormData.append('X_NOPOLISI', req.body.X_NOPOLISI);
        bodyFormData.append('X_LINE_SO', req.body.X_LINE_SO);
        bodyFormData.append('X_SO', req.body.X_SO);
        const data = await api.post(`/dev/sd/sdonline/service/get_realisasi.php`, bodyFormData);

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