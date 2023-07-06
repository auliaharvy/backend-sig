const apiAdapter = require('../../apiAdapter');
const root = require('rootrequire');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        if (req.files.receiving_driver_approval) {
            req.body.receiving_driver_approval = '/public/uploads/sjp-statuss/' + req.files.receiving_driver_approval.name;
            const receiving_driver_approval = req.files.receiving_driver_approval;
            receiving_driver_approval.mv(`${root}/public/uploads/sjp-statuss/${receiving_driver_approval.name}`, function (err) {
                if (err) {
                    //(err)
                    return res.status(500).json({
                    status: 'error',
                    message: 'Error file upload'
                });
                }
            });
        }
        //(req.body)
        const sjpStatus = await api.patch(`/api/sjp-statuss/${id}`, req.body, req.headers);
        return res.json(sjpStatus.data);
    } catch (error) {
        //(error);
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        if (error.response) {
            const {
                status,
                data
            } = error.response;
            return res.status(status).json(data);
        }
        

        return res.status(400).json({
                status: 'error',
                message: 'Something went wrong'
            });
    }
}