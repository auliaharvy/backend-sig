const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE,
    HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const imagecourses = await api.get('/api/imagecourse', {
            params: {
                ...req.query
            }
        });
        

        return res.json(imagecourses.data);
    } catch (error) {

        if(error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        //const { data } = error.response;
        return res.status(500).json(error.response);
    }
}