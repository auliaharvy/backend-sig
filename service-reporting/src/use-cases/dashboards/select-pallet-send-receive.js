const selectPalletSendReceive = ({ dashboardDb }) => {
  return async function select(info) {
    let data = {};

    const { query } = info;

    if (query.year) {
      // select all
      const res = await dashboardDb.getPalletSendReceive(query.year, query.month, query.distribution);
      if (res) {
        // only when there is data returned
        const dataSend = res[0];
        const dataReceive = res[1];
        data = {
          dataSend: dataSend,
          dataReceive: dataReceive,
        };
        return data;
      }
      
    }

    
  };
};

module.exports = selectPalletSendReceive;
