const logger = require('../lib/logger');
const makeExpressCallback = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.baseUrl,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
        Cookie: req.get("Authorization"),
        "Access-Control-Allow-Origin": "*",
      },
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set("Access-Control-Allow-Origin", "*");
          res.set(httpResponse.headers);
        }
        res.type("json");
        const logMessage = httpResponse.statusCode + '-' + httpRequest.method +': ' + httpRequest.path + ' | ' + httpResponse.body.error;
        logger.info(logMessage)
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => {
        console.log(e)
        logger.error(e.message || "ERROR")
        res.sendStatus(500)
      });
  };
};

module.exports = makeExpressCallback;