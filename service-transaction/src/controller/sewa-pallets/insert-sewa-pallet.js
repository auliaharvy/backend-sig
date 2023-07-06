const sewaPalletsAdd = ({ addSewaPallets }) => {
    return async function post(httpRequest) {
      try {
        const { source = {}, ...info } = httpRequest.body;
        source.ip = httpRequest.ip;
        source.browser = httpRequest.headers["User-Agent"];
        if (httpRequest.headers["Referer"]) {
          source.referrer = httpRequest.headers["Referer"];
        }

        const posted = await addSewaPallets({
          ...info,
          source,
        });
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 201,
          body: { posted },
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
  
  module.exports = sewaPalletsAdd;