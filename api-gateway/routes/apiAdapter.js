const axios = require('axios');

const { TIMEOUT } = process.env;
module.exports = (baseUrl) => {
    return axios.create({
        baseURL : baseUrl,
        timeout : parseInt(TIMEOUT),
        // headers: {
        //     'Content-Type': 'application/json',
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        // }
    })
}