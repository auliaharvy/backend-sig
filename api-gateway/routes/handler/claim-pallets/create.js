const apiAdapter = require('../../apiAdapter');
const root = require('rootrequire');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        req.body.photo = '/public/uploads/claim-pallets/' + req.files.photo.name;
        const photo = req.files.photo;
        photo.mv(`${root}/public/uploads/claim-pallets/${photo.name}`, function (err) {
            if (err) {
                return res.status(500).json({
                status: 'error',
                message: 'Error file upload'
            });
            }
        });
        const data = await api.post('api/claim-pallets', req.body, req.headers);
        return res.json(data.data);
    } catch (error) {

        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        const {
            status,
        } = error.response;
        return res.status(status).json(error.response);
    }
}