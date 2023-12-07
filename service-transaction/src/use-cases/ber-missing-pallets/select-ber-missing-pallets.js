const selectBerMissingPallet = ({ berMissingPalletDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id, from, to } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await berMissingPalletDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            // push items to array
            data.push({
              id: e.id,
              trx_number: e.trx_number ? e.trx_number : null,
              id_company: e.id_company ? e.id_company : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_reporter: e.id_user_reporter ? e.id_user_reporter : null,
              transaction_type: e.transaction_type ? e.transaction_type : 0,
              qty_tbr_pallet: e.qty_tbr_pallet ? e.qty_tbr_pallet : 0,
              qty_good_pallet: e.qty_good_pallet ? e.qty_good_pallet : 0,
              qty_ber_missing_pallet: e.qty_ber_missing_pallet ? e.qty_ber_missing_pallet : 0,
              note: e.note ? e.note : null,
              company_name: e.company_name ? e.company_name : null,
              reporter_name: e.reporter_name ? e.reporter_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else if(from) {
        // select all
        const res = await berMissingPalletDb.exportAll({ from, to });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            // push items to array
            data.push({
              id: e.id,
              trx_number: e.trx_number ? e.trx_number : null,
              id_company: e.id_company ? e.id_company : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_reporter: e.id_user_reporter ? e.id_user_reporter : null,
              transaction_type: e.transaction_type ? e.transaction_type : 0,
              qty_tbr_pallet: e.qty_tbr_pallet ? e.qty_tbr_pallet : 0,
              qty_good_pallet: e.qty_good_pallet ? e.qty_good_pallet : 0,
              qty_ber_missing_pallet: e.qty_ber_missing_pallet ? e.qty_ber_missing_pallet : 0,
              note: e.note ? e.note : null,
              company_name: e.company_name ? e.company_name : null,
              reporter_name: e.reporter_name ? e.reporter_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await berMissingPalletDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            // push items to array
            data.push({
              id: e.id,
              trx_number: e.trx_number ? e.trx_number : null,
              id_company: e.id_company ? e.id_company : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_reporter: e.id_user_reporter ? e.id_user_reporter : null,
              transaction_type: e.transaction_type ? e.transaction_type : 0,
              qty_tbr_pallet: e.qty_tbr_pallet ? e.qty_tbr_pallet : 0,
              qty_good_pallet: e.qty_good_pallet ? e.qty_good_pallet : 0,
              qty_ber_missing_pallet: e.qty_ber_missing_pallet ? e.qty_ber_missing_pallet : 0,
              note: e.note ? e.note : null,
              company_name: e.company_name ? e.company_name : null,
              reporter_name: e.reporter_name ? e.reporter_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectBerMissingPallet;