const apiAdapter = require('../../apiAdapter');
const {
    URL_API_SSO
} = process.env;
const logger = require('../../../lib/logger');


const api = apiAdapter(URL_API_SSO);
const FormData = require('form-data');

module.exports = async (req, res) => {
    try {
        var bodyFormData = new FormData();
        bodyFormData.append('token', '9fd977dad8b0e2231b7a2112faa889df');
        bodyFormData.append('username', req.body.username);
        bodyFormData.append('password', req.body.password);
        req.headers.token = '$2y$10$3DDqyL./M7Qn4h426rnOAux3H20.VWXE2sq0B3tk6n24QDtswGwF.'
        const data = await api.post(`/api/login`, bodyFormData ,req.headers);
        return res.json(data.data);
    } catch (error) {
        console.log(error);
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }
        

        // const {
        //     data
        // } = error.response;
        const response = {
            message: 'no connection to API'
        } 
        return res.status(500).json(response);
    }
}