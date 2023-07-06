const bulkTruckAdd = ({
  bulkAddTrucks
}) => {
  return async function post(httpRequest) {
    try {
      const {
        source = {}, ...info
      } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }
      const message = await bulkAddTrucks({
        ...info,
        source,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          message
        },
      };
    } catch (e) {
      // TODO: Error logging
      //(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
};

module.exports = bulkTruckAdd;