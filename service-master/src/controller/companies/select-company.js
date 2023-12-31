const companiesSelects = ({
  selectCompanies
}) => {
  return async function get(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      //get the httprequest body
      const {
        source = {}, ...info
      } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }
      //(httpRequest)
      const toView = {
        ...info,
        source,
        id: httpRequest.params.id, // when id is passed
        userId: httpRequest.headers.userid
      };
      const data = await selectCompanies(toView);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          data
        },
      };
    } catch (e) {
      // TODO: Error logging
      //(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
};

module.exports = companiesSelects;