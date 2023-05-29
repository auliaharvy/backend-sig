const selectDetailPallet = ({ dashboardDb }) => {
  return async function select(info) {
    let data = [];

    const { query } = info;
    // select all
    const res = await dashboardDb.detailPallet({query});
    if (res) {
      // only when there is data returned
      const items = res;
      // console.log(items);
      for (let i = 0; i < items.length; i++) {
        const e = items[i].dataValues;

        const palletOut = await dashboardDb.getPalletOut(e.id);
        const palletIn = await dashboardDb.getPalletIn(e.id);
        var pallet_out = 0;
        var pallet_in = 0;
        if (palletOut.rowCount > 0) {
          pallet_out = palletOut.rows[0].total_out;
        }
        if (palletIn.rowCount > 0) {
          pallet_in = palletIn.rows[0].total_out;
        }
        
        // push items to array
        data.push({
          id: e.id,
          name: e.name ? e.name : null,
          stock: parseInt(e.stock) ? parseInt(e.stock): 0,
          pallet_out: parseInt(pallet_out) ? parseInt(pallet_out): 0,
          pallet_in: parseInt(pallet_in) ? parseInt(pallet_in): 0,
          jumlah: e.jumlah,
          kondisi: e.kondisi,
        });
      }
    }
    return data;
  };
};

module.exports = selectDetailPallet;
