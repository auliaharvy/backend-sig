const selectNewPallet = ({ newPalletDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id, from, to } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await newPalletDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_trx_change_quota: e.id_trx_change_quota ? e.id_trx_change_quota : null,
              id_company_workshop: e.id_company_workshop ? e.id_company_workshop : null,
              trx_number: e.trx_number ? e.trx_number : null,
              qty_request_pallet: e.qty_request_pallet ? e.qty_request_pallet : null,
              qty_ready_pallet: e.qty_ready_pallet ? e.qty_ready_pallet : null,
              status: e.status ? e.status : null,
              no_change_quota: e.no_change_quota ? e.no_change_quota : null,
              company_workshop: e.company_workshop ? e.company_workshop : null,
              company_requester: e.company_requester ? e.company_requester : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else if(from) {
        // select all
        const res = await newPalletDb.exportAll({ from, to });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_trx_change_quota: e.id_trx_change_quota ? e.id_trx_change_quota : null,
              id_company_workshop: e.id_company_workshop ? e.id_company_workshop : null,
              trx_number: e.trx_number ? e.trx_number : null,
              qty_request_pallet: e.qty_request_pallet ? e.qty_request_pallet : null,
              qty_ready_pallet: e.qty_ready_pallet ? e.qty_ready_pallet : null,
              status: e.status ? e.status : null,
              no_change_quota: e.no_change_quota ? e.no_change_quota : null,
              company_workshop: e.company_workshop ? e.company_workshop : null,
              company_requester: e.company_requester ? e.company_requester : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await newPalletDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_trx_change_quota: e.id_trx_change_quota ? e.id_trx_change_quota : null,
              id_company_workshop: e.id_company_workshop ? e.id_company_workshop : null,
              trx_number: e.trx_number ? e.trx_number : null,
              qty_request_pallet: e.qty_request_pallet ? e.qty_request_pallet : null,
              qty_ready_pallet: e.qty_ready_pallet ? e.qty_ready_pallet : null,
              status: e.status ? e.status : null,
              no_change_quota: e.no_change_quota ? e.no_change_quota : null,
              company_workshop: e.company_workshop ? e.company_workshop : null,
              company_requester: e.company_requester ? e.company_requester : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectNewPallet;