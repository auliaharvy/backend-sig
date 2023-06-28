const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_USER
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const roleHasPermission = await api.post('api/rolehaspermission', req.body);
        return res.json(roleHasPermission.data);
    } catch (error) {

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