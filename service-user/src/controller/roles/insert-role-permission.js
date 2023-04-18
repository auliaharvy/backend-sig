const roleAddPermission = ({
  addRolePermissionsUseCase
}) => {
  return async function post(httpRequest) {
    try {
      
      const source = {}
      const data = {}
      data.data = httpRequest.body
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }
      const message = await addRolePermissionsUseCase({
        data,
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
      console.log(e);

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

module.exports = roleAddPermission;