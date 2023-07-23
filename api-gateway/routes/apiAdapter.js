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
        headers: {
            'Retry-After': 50000,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
    })

    axiosInstance.interceptors.response.use((response) => {
        const logMessage = response.config.username + ' -> ' + response.status + '-' + response.config.method +': ' + response.config.baseURL + response.config.url;
        logger.info(logMessage)
        return response;
    },(error) => {

        console.log(error)
        // const errorMessage = {
        //     response: {
        //         status: error.response.status || 'Error',
        //         code: error.code || 400,
        //         message: error.message || "Error",
        //         data: error.response.data.error || error.response.data,
        //     }
        // }

        logger.error(error || "ERROR")
        return Promise.reject(error)
    })

    return axiosInstance;
}