const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_TRANSACTION
} = process.env;

const api = apiAdapter(URL_SERVICE_TRANSACTION);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        req.body.receiving_driver_approval = '/public/uploads/sjp-statuss/' + req.files.sending_driver_approval.name;
        const sending_driver_approval = req.files.sending_driver_approval;
        sending_driver_approval.mv(`${root}/public/uploads/sjp-statuss/${sending_driver_approval.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                status: 'error',
                message: 'Error file upload'
            });
            }
        });
        const sjpStatus = await api.patch(`/api/sjp-statuss/${id}`, req.body, req.headers);
        return res.json(sjpStatus.data);
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