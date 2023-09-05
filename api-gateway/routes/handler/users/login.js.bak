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
        bodyFormData.append('token', '9821d310309b8ec228b5cc45c19b4e0f');
        bodyFormData.append('username', req.body.username);
        bodyFormData.append('password', req.body.password);
        // req.headers.token = '$2y$10$3DDqyL./M7Qn4h426rnOAux3H20.VWXE2sq0B3tk6n24QDtswGwF.';
        // req.headers.token = '$2y$10$3DDqyL./M7Qn4h426rnOAux3H20.VWXE2sq0B3tk6n24QDtswGwF.';
        // login sso
        const data = await api.post(`/api/login`, bodyFormData , req.headers);
        // console.log(data);

        // tambah fungsi jika dia berhasil login tapi belum ada username

        if(data.data.success == false) {
            if(data.data.msg == 'user dan password tidak sesuai') {
                return res.status(400).json(data.data);
            } else if(data.data.msg == 'Single Authentication, Error Validation Data. Please Complete Send Data Correctly') {
                try {
                    // login pms
                    const user = await apiUser.post('/api/users/login', req.body);
                    const data = user.data.data;
    
                    const token = jwt.sign({
                        data
                    }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
    
                    const refreshtoken =  jwt.sign({
                        data
                    }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
                    await apiUser.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
                    return res.json({
                        status: 'success',
                        data: {
                            token,
                            refresh_token: refreshtoken,
                            data: data
                        }
                    });
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
            } else {
                //console.log('register')
                // register user if new
                var dataRegister = {
                    username: data.data.messages.username,
                    password: 'l0g1n550',
                    fullname: data.data.messages.username,
                    nopeg: data.data.messages.mk_nopeg,
                    email: data.data.messages.email,
                    is_sso: 1,
                };

                try {
                    const register = await apiUser.post('/api/users/register', dataRegister);
                } catch (error) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Pendaftaran user error, silahkan di ulang kembali'
                    });
                }

                try {
                    // const loginData = {
                    //     username: data.data.messages.username,
                    //     password: 'l0g1n550',
                    // };
                    // login pms
                    const user = await apiUser.post('/api/users/login', { username: dataRegister.username, password: 'l0g1n550' });
                    const data = user.data.data;

                    const tokenData = {
                        id: data.id,
                        username: data.username,
                        fullname: data.fullname,
                        email: data.email,
                        ip: data.ip,
                        device: data.device,
                        time_access: data.time_access
                    }
                    const token = jwt.sign({
                        data
                    }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

                    const refreshtoken =  jwt.sign({
                        data
                    }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
                    await apiUser.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
                    return res.json({
                        status: 'success',
                        data: {
                            token,
                            refresh_token: refreshtoken,
                            data: data
                        }
                    });
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
        } else {
            const dataLoginSSo = {
                username: req.body.username,
                password: 'l0g1n550',
            }
            try {
                // login pms
                const user = await apiUser.post('/api/users/login', dataLoginSSo);
                const dataLogin = user.data.data;
                const tokenData = {
                    id: dataLogin.id,
                    username: dataLogin.username,
                    fullname: dataLogin.fullname,
                    email: dataLogin.email,
                    ip: dataLogin.ip,
                    device: dataLogin.device,
                    time_access: dataLogin.time_access
                }
                const token = jwt.sign({
                    tokenData
                }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

                const refreshtoken =  jwt.sign({
                    tokenData
                }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
                await apiUser.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
                return res.json({
                    status: 'success',
                    data: {
                        token,
                        refresh_token: refreshtoken,
                        data: data
                    }
                });
            } catch (error) {

                if(error.data.message == 'Account not found') {
                    var dataRegister = {
                        username: data.data.messages.username,
                        password: 'l0g1n550',
                        fullname: data.data.messages.username,
                        nopeg: data.data.messages.mk_nopeg,
                        email: data.data.messages.email,
                        is_sso: 1,
                    };
    
                    try {
                        const register = await apiUser.post('/api/users/register', dataRegister);
                    } catch (error) {
                        return res.status(400).json({
                            status: 'error',
                            message: 'Pendaftaran user error, silahkan di ulang kembali'
                        });
                    }
    
                    try {
                        // const loginData = {
                        //     username: data.data.messages.username,
                        //     password: 'l0g1n550',
                        // };
                        // login pms
                        const user = await apiUser.post('/api/users/login', { username: dataRegister.username, password: 'l0g1n550' });
                        const data = user.data.data;

                        const tokenData = {
                            id: data.id,
                            username: data.username,
                            fullname: data.fullname,
                            email: data.email,
                            ip: data.ip,
                            device: data.device,
                            time_access: data.time_access
                        }
    
                        const token = jwt.sign({
                            tokenData
                        }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
    
                        const refreshtoken =  jwt.sign({
                            tokenData
                        }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
                        await apiUser.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
                        return res.json({
                            status: 'success',
                            data: {
                                token,
                                refresh_token: refreshtoken,
                                data: data
                            }
                        });
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
    } catch (error) {
        try {
            // login pms
            const user = await apiUser.post('/api/users/login', req.body);
            const data = user.data.data;
            
            const tokenData = {
                id: data.id,
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                ip: data.ip,
                device: data.device,
                time_access: data.time_access
            }
            const token = jwt.sign({
                tokenData
            }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

            const refreshtoken =  jwt.sign({
                tokenData
            }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
            await apiUser.post('/api/users/token', { refresh_token : refreshtoken, user_id: data.id });
            return res.json({
                status: 'success',
                data: {
                    token,
                    refresh_token: refreshtoken,
                    data: data
                }
            });
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
}
