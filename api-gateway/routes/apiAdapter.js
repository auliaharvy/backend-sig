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
        const logMessage = response.status + '-' + response.config.method +': ' + response.config.baseURL + response.config.url;
        logger.info(logMessage)
        return response;
    },(error) => {
        const errorMessage = {
            response: {
                status: 500,
                code: error.code,
                message: error.message,
                data: error.message,
            }
        }

        logger.error(error.message || "ERROR")
        return Promise.reject(errorMessage)
    })

    return axiosInstance;
}