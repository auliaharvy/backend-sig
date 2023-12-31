const userLogin = ({ loginUsers }) => {
    return async function post(httpRequest) {
      //(httpRequest);
      try {
        const { source = {}, ...info } = httpRequest.body;
        source.ip = httpRequest.ip;
        source.device = httpRequest.device;
        source.browser = httpRequest.headers["User-Agent"];
        if (httpRequest.headers["Referer"]) {
          source.referrer = httpRequest.headers["Referer"];
        }
        const posted = await loginUsers({
          ...info,
          source,
        });
        //(posted)
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: posted.httpCode,
          body: posted.data,
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
  
  module.exports = userLogin;