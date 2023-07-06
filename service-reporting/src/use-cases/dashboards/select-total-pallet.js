const selectTotalPallet = ({ dashboardDb }) => {
  return async function select() {
    let data = [];

    // select all
    const res = await dashboardDb.totalPallet({});
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
    return data;
  };
};

module.exports = selectTotalPallet;
