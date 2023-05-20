const selectPalletRealization = ({ palletRealizationDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await palletRealizationDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_trx_new_pallet: e.id_trx_new_pallet ? e.id_trx_new_pallet : null,
              no_new_pallet: e.no_new_pallet ? e.no_new_pallet : null,
              qty_pallet: e.qty_pallet ? e.qty_pallet : null,
              trx_number: e.trx_number ? e.trx_number : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await palletRealizationDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_trx_new_pallet: e.id_trx_new_pallet ? e.id_trx_new_pallet : null,
              no_new_pallet: e.no_new_pallet ? e.no_new_pallet : null,
              qty_pallet: e.qty_pallet ? e.qty_pallet : null,
              trx_number: e.trx_number ? e.trx_number : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectPalletRealization;