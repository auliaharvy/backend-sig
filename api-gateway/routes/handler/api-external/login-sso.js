const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_API_SSO,
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;
const logger = require('../../../lib/logger');


const api = apiAdapter(URL_API_SSO);
const apiUser = apiAdapter(URL_SERVICE_USER);
const apiTest = apiAdapter('https://api.mockfly.dev/mocks/c597ff39-ac42-4b49-ab01-81039879c888');
const FormData = require('form-data');

module.exports = async (req, res) => {
    try {
        var bodyFormData = new FormData();
        // bodyFormData.append('token', '9fd977dad8b0e2231b7a2112faa889df');
        // bodyFormData.append('token', '9821d310309b8ec228b5cc45c19b4e0f');
        bodyFormData.append('token', req.body.token);
        bodyFormData.append('username', req.body.username);
        bodyFormData.append('password', req.body.password);
        // req.headers.token = '$2y$10$3DDqyL./M7Qn4h426rnOAux3H20.VWXE2sq0B3tk6n24QDtswGwF.';
        // login sso
        const data = await api.post(`/api/login`, bodyFormData ,req.headers);
        console.log(data);

       return data.data;
    } catch (error) {
        if(error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable on HOST ' + URL_SERVICE_USER
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