const palletSendReceiveSelect = ({ selectPalletSendReceives }) => {
    return async function get(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        //get the httprequest body
        const { source = {}, ...info } = httpRequest.body;
        source.ip = httpRequest.ip;
        source.browser = httpRequest.headers["User-Agent"];
        if (httpRequest.headers["Referer"]) {
          source.referrer = httpRequest.headers["Referer"];
        }
        const toView = {
          ...info,
          source,
          id: httpRequest.params.id, // when id is passed
          query: httpRequest.query
        };
        const data = await selectPalletSendReceives(toView);
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 200,
          body: { data },
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
  
  module.exports = palletSendReceiveSelect;