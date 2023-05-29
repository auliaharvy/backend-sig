const selectTransporterAdjusment = ({ transporterAdjusmentDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await transporterAdjusmentDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await transporterAdjusmentDb.getPalletQuantity(
              e.id
            );
            var qtyGoodPallet = 0;
            var qtyTbrPallet = 0;
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'Good Pallet') {
                qtyGoodPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
                qtyTbrPallet = parseInt(qtyPallet.quantity)
              }
            }

            // push items to array
            data.push({
              id: e.id,
              trx_number: e.trx_number ? e.trx_number : null,
              id_company_transporter: e.id_company_transporter ? e.id_company_transporter : null,
              id_company: e.id_company ? e.id_company : null,
              id_user_reporter: e.id_user_reporter ? e.id_user_reporter : null,
              is_from_pool: e.is_from_pool ? e.is_from_pool : 0,
              note: e.note ? e.note : null,
              good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
              tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
              transporter_name: e.transporter_name ? e.transporter_name : null,
              company_name: e.company_name ? e.company_name : null,
              reporter_name: e.reporter_name ? e.reporter_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await transporterAdjusmentDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];

            const resPalletQuantity = await transporterAdjusmentDb.getPalletQuantity(
              e.id
            );
            var qtyGoodPallet = 0;
            var qtyTbrPallet = 0;
            for (const qtyPallet of resPalletQuantity.rows) {
              if(qtyPallet.kondisi_pallet == 'Good Pallet') {
                qtyGoodPallet = parseInt(qtyPallet.quantity)
              }
              if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
                qtyTbrPallet = parseInt(qtyPallet.quantity)
              }
            }

            // push items to array
            data.push({
              id: e.id,
              trx_number: e.trx_number ? e.trx_number : null,
              id_company_transporter: e.id_company_transporter ? e.id_company_transporter : null,
              id_company: e.id_company ? e.id_company : null,
              id_user_reporter: e.id_user_reporter ? e.id_user_reporter : null,
              is_from_pool: e.is_from_pool ? e.is_from_pool : 0,
              note: e.note ? e.note : null,
              good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
              tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
              transporter_name: e.transporter_name ? e.transporter_name : null,
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
  
  module.exports = selectTransporterAdjusment;