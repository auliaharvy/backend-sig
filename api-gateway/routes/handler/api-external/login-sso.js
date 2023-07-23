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
const apiTest = apiAdapter('http://38.47.180.138:4000/api/v1');
const FormData = require('form-data');

module.exports = async (req, res) => {
    try {
        var bodyFormData = new FormData();
        // bodyFormData.append('token', '9fd977dad8b0e2231b7a2112faa889df');
        bodyFormData.append('token', '9821d310309b8ec228b5cc45c19b4e0f');
        bodyFormData.append('username', req.body.username);
        bodyFormData.append('password', req.body.password);
        req.headers.token = '$2y$10$3DDqyL./M7Qn4h426rnOAux3H20.VWXE2sq0B3tk6n24QDtswGwF.';
        // login sso
        const data = await api.post(`/api/login`, bodyFormData ,req.headers);

        if(data.data.success == false) {
            if(data.data.msg == 'user dan password tidak sesuai') {
                return res.json(data.data);
            } else {
                // register user if new
                var dataRegister = {
                    username: req.body.username,
                    password: 'l0g1n550',
                    fullname: data.data.messages.mk_nopeg,
                    email: data.data.messages.email,
                    is_sso: 1,
                };

                const register = await apiUser.post('/api/users/register', dataRegister);

                // login pms
                const user = await api.post('/api/users/login', req.body);
                const data = user.data.data;

                const token = jwt.sign({
                    data
                }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

                const refreshtoken =  jwt.sign({
                    data
                }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
                await api.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
                return res.json({
                    status: 'success',
                    data: {
                        token,
                        refresh_token: refreshtoken,
                        data: data
                    }
                });
            }
        } else {
            const dataLoginSSo = {
                username: req.body.username,
                password: 'l0g1n550',
            }
            const user = await apiUser.post('/api/users/login', req.body);
            const data = user.data.data;

            const token = jwt.sign({
                data
            }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

            const refreshtoken =  jwt.sign({
                data
            }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
            await api.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
            return res.json({
                status: 'success',
                data: {
                    token,
                    refresh_token: refreshtoken,
                    data: data
                }
            });
        }

        // const data = await apiTest.post(`/users/login`, req.body ,req.headers);
        // if(data.data.message == 'succeed') {
        //     // register user if new
        //     var dataRegister = {
        //         username: req.body.username,
        //         password: req.body.password,
        //         fullname: data.data.objResponse.username,
        //         email: data.data.objResponse.email,
        //         is_sso: 1,
        //     };
        //     //(data.data);
        //     const register = await apiUser.post('/api/users/register', dataRegister);
        // } else {
        //     //('errpr  ');
        // }
        
        
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }
        

        return res.status(500).json(error.response);
    }
}