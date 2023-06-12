const axios = require('axios');
const logger = require('../lib/logger');

const { TIMEOUT } = process.env;

module.exports = (baseUrl) => {

    const config = {
        BASE_URL: baseUrl
    }
    
    const axiosInstance =  axios.create({
        baseURL : config.BASE_URL,
        timeout : parseInt(TIMEOUT),
        // headers: {
        //     'Content-Type': 'application/json',
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        // }
    })

    axiosInstance.interceptors.response.use((response) => {
        const logMessage = response.config.username + ' -> ' + response.status + '-' + response.config.method +': ' + response.config.baseURL + response.config.url;
        logger.info(logMessage)
        return response;
    },(error) => {
        const errorMessage = {
            response: {
                status: error.response.status,
                code: error.code,
                message: error.message,
                data: error.response.data.error,
            }
        }

        logger.error(error.response.data.error || "ERROR")
        return Promise.reject(errorMessage)
    })

    return axiosInstance;
}