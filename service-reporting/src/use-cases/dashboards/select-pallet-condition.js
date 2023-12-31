const selectPalletCondition = ({ dashboardDb }) => {
  return async function select(info) {
    let data = [];

    const { query } = info;
    //(query);

    if (query.type) {
      // select all
      const res = await dashboardDb.palletCondition({query});
      if (res) {
        // only when there is data returned
        const items = res;
        // //(items);
        for (let i = 0; i < items.length; i++) {
          const e = items[i].dataValues;
          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : null,
            jumlah_pallet: e.jumlah_pallet ? e.jumlah_pallet : 0,
          });
        }
      }
      return res;
    }

    if (query.id) {
      // select all
      const res = await dashboardDb.palletConditionCompany({query});
      if (res) {
        // only when there is data returned
        const items = res;
        // //(items);
        for (let i = 0; i < items.length; i++) {
          const e = items[i].dataValues;
          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : null,
            jumlah_pallet: e.jumlah_pallet ? e.jumlah_pallet : 0,
          });
        }
      }
      return res;
    }
    
  };
};

module.exports = selectPalletCondition;
