const selectClaimPallet = ({ claimPalletDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await claimPalletDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await claimPalletDb.getPalletQuantity(
              e.id
            );

            var qtyBerPallet = 0;
            var qtyMissingPallet = 0;
            console.log(resPalletQuantity.rows);
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'BER Pallet') {
                qtyBerPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'Missing Pallet') {
                qtyMissingPallet = parseInt(qtyPallet.quantity)
              }
            }
  
            // push items to array
            data.push({
              id: e.id,
              id_company_distributor: e.id_company_distributor ? e.id_company_distributor : null,
              trx_number: e.trx_number ? e.trx_number : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_distributor: e.id_user_distributor ? e.id_user_distributor : null,
              status: e.status ? e.status : null,
              reason_manager: e.reason_manager ? e.reason_manager : null,
              reason_distributor: e.reason_distributor ? e.reason_distributor : null,
              price: parseInt(e.price) ? parseInt(e.price) : null,
              ber_pallet: qtyBerPallet ? qtyBerPallet : null,
              missing_pallet: qtyMissingPallet ? qtyMissingPallet : null,
              total_price: parseInt(e.price) * (qtyBerPallet + qtyMissingPallet),
              company_name: e.company_name ? e.company_name : null,
              manager_name: e.manager_name ? e.manager_name : null,
              pic_distributor: e.pic_distributor ? e.pic_distributor : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await claimPalletDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await claimPalletDb.getPalletQuantity(
              e.id
            );

            var qtyBerPallet = 0;
            var qtyMissingPallet = 0;
            console.log(resPalletQuantity.rows);
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'BER Pallet') {
                qtyBerPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'Missing Pallet') {
                qtyMissingPallet = parseInt(qtyPallet.quantity)
              }
            }
  
            // push items to array
            data.push({
              id: e.id,
              id_company_distributor: e.id_company_distributor ? e.id_company_distributor : null,
              trx_number: e.trx_number ? e.trx_number : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_distributor: e.id_user_distributor ? e.id_user_distributor : null,
              status: e.status ? e.status : null,
              reason_manager: e.reason_manager ? e.reason_manager : null,
              reason_distributor: e.reason_distributor ? e.reason_distributor : null,
              price: parseInt(e.price) ? parseInt(e.price) : null,
              ber_pallet: qtyBerPallet ? qtyBerPallet : null,
              missing_pallet: qtyMissingPallet ? qtyMissingPallet : null,
              total_price: parseInt(e.price) * (qtyBerPallet + qtyMissingPallet),
              company_name: e.company_name ? e.company_name : null,
              manager_name: e.manager_name ? e.manager_name : null,
              pic_distributor: e.pic_distributor ? e.pic_distributor : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectClaimPallet;