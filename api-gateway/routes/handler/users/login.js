const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
        if(error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable on HOST ' + URL_SERVICE_USER
            })
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}