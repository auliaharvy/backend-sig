const selectSewaPallet = ({ sewaPalletDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id, from, to } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await sewaPalletDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await sewaPalletDb.getPalletQuantity(
              e.id
            );

            var qtyGoodPallet = 0;
            var qtyTbrPallet = 0;
            var qtyBerPallet = 0;
            var qtyMissingPallet = 0;
            console.log(resPalletQuantity.rows);
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'Good Pallet') {
                qtyGoodPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
                qtyTbrPallet = parseInt(qtyPallet.quantity)
              }
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
              trx_number: e.trx_number ? e.trx_number : null,
              id_company_distributor: e.id_company_distributor ? e.id_company_distributor : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_distributor: e.id_user_distributor ? e.id_user_distributor : null,
              status: e.status ? e.status : 0,
              reason_manager: e.reason_manager ? e.reason_manager : null,
              reason_distributor: e.reason_distributor ? e.reason_distributor : null,
              price: parseInt(e.price) ? parseInt(e.price) : 0,
              good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
              tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
              ber_pallet: qtyBerPallet ? qtyBerPallet : 0,
              missing_pallet: qtyMissingPallet ? qtyMissingPallet : 0,
              total_price: parseInt(e.total) ? parseInt(e.total) : 0,
              company_name: e.company_name ? e.company_name : null,
              manager_name: e.manager_name ? e.manager_name : null,
              pic_distributor: e.pic_distributor ? e.pic_distributor : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else if(from) {
        // select all
        const res = await sewaPalletDb.exportAll({ from, to });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await sewaPalletDb.getPalletQuantity(
              e.id
            );

            var qtyGoodPallet = 0;
            var qtyTbrPallet = 0;
            var qtyBerPallet = 0;
            var qtyMissingPallet = 0;
            console.log(resPalletQuantity.rows);
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'Good Pallet') {
                qtyGoodPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
                qtyTbrPallet = parseInt(qtyPallet.quantity)
              }
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
              trx_number: e.trx_number ? e.trx_number : null,
              id_company_distributor: e.id_company_distributor ? e.id_company_distributor : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_distributor: e.id_user_distributor ? e.id_user_distributor : null,
              status: e.status ? e.status : 0,
              reason_manager: e.reason_manager ? e.reason_manager : null,
              reason_distributor: e.reason_distributor ? e.reason_distributor : null,
              price: parseInt(e.price) ? parseInt(e.price) : 0,
              good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
              tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
              ber_pallet: qtyBerPallet ? qtyBerPallet : 0,
              missing_pallet: qtyMissingPallet ? qtyMissingPallet : 0,
              total_price: parseInt(e.total) ? parseInt(e.total) : 0,
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
        const res = await sewaPalletDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await sewaPalletDb.getPalletQuantity(
              e.id
            );

            var qtyGoodPallet = 0;
            var qtyTbrPallet = 0;
            var qtyBerPallet = 0;
            var qtyMissingPallet = 0;
            console.log(resPalletQuantity.rows);
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'Good Pallet') {
                qtyGoodPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
                qtyTbrPallet = parseInt(qtyPallet.quantity)
              }
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
              trx_number: e.trx_number ? e.trx_number : null,
              id_company_distributor: e.id_company_distributor ? e.id_company_distributor : null,
              id_user_manager: e.id_user_manager ? e.id_user_manager : null,
              id_user_distributor: e.id_user_distributor ? e.id_user_distributor : null,
              status: e.status ? e.status : 0,
              reason_manager: e.reason_manager ? e.reason_manager : null,
              reason_distributor: e.reason_distributor ? e.reason_distributor : null,
              price: parseInt(e.price) ? parseInt(e.price) : 0,
              good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
              tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
              ber_pallet: qtyBerPallet ? qtyBerPallet : 0,
              missing_pallet: qtyMissingPallet ? qtyMissingPallet : 0,
              total_price: parseInt(e.total) ? parseInt(e.total) : 0,
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
  
  module.exports = selectSewaPallet;