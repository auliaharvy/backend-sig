const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_USER
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await api.patch(`/api/users/${id}`, req.body);
        return res.json(user.data);
    } catch (error) {

        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        if (error.response.status) {
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