const selectPalletTransfer = ({ palletTransfersDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await palletTransfersDb.selectOne({ id });

        // mendapatkan jumlah pallet di pallet transfer
        const resPalletQuantity = await palletTransfersDb.getPalletQuantity(
          id
        );

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_company_departure: e.id_company_departure ? e.id_company_departure : null,
              id_company_destination: e.id_company_destination ? e.id_company_destination : null,
              id_company_transporter: e.id_company_transporter ? e.id_company_transporter : null,
              id_truck: e.id_truck ? e.id_truck : null,
              id_driver: e.id_driver ? e.id_driver : null,
              id_user_checker_sender: e.id_user_checker_sender ? e.id_user_checker_sender : null,
              second_driver: e.second_driver ? e.second_driver : null,
              trx_code: e.trx_code ? e.trx_code : null,
              status: e.status ? e.status : 0,
              departure_company: e.departure_company ? e.departure_company : null,
              destination_company: e.destination_company ? e.destination_company : null,
              transporter_company: e.transporter_company ? e.transporter_company : null,
              note: e.note ? e.note : null,
              reason: e.reason ? e.reason : null,
              license_plate: e.license_plate ? e.license_plate : null,
              palletQuantity: resPalletQuantity.rows ? resPalletQuantity.rows : [
                {
                  kondisi_pallet: "TBR Pallet",
                  "quantity": 0
                },
                {
                  kondisi_pallet: "BER Pallet",
                    "quantity": 0
                },
                {
                  kondisi_pallet: "Missing Pallet",
                    "quantity": 0
                },
                {
                  kondisi_pallet: "Good Pallet",
                    "quantity": 0
                }
              ],
              driver_name: e.driver_name ? e.driver_name : null,
              sender_name: e.sender_name ? e.sender_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await palletTransfersDb.selectAll({});

        // mendapatkan jumlah pallet di pallet transfer
        const resPalletQuantity = await palletTransfersDb.getPalletQuantity(
          id
        );

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            const resPalletQuantity = await palletTransfersDb.getPalletQuantity(
              e.id
            );
            // push items to array
            data.push({
              id: e.id,
              id_company_departure: e.id_company_departure ? e.id_company_departure : null,
              id_company_destination: e.id_company_destination ? e.id_company_destination : null,
              id_company_transporter: e.id_company_transporter ? e.id_company_transporter : null,
              id_truck: e.id_truck ? e.id_truck : null,
              id_driver: e.id_driver ? e.id_driver : null,
              id_user_checker_sender: e.id_user_checker_sender ? e.id_user_checker_sender : null,
              second_driver: e.second_driver ? e.second_driver : null,
              trx_code: e.trx_code ? e.trx_code : null,
              status: e.status ? e.status : 0,
              departure_company: e.departure_company ? e.departure_company : null,
              destination_company: e.destination_company ? e.destination_company : null,
              transporter_company: e.transporter_company ? e.transporter_company : null,
              license_plate: e.license_plate ? e.license_plate : null,
              note: e.note ? e.note : null,
              reason: e.reason ? e.reason : null,
              palletQuantity: resPalletQuantity.rows ? resPalletQuantity.rows : [
                {
                  kondisi_pallet: "TBR Pallet",
                  "quantity": 0
                },
                {
                  kondisi_pallet: "BER Pallet",
                    "quantity": 0
                },
                {
                  kondisi_pallet: "Missing Pallet",
                    "quantity": 0
                },
                {
                  kondisi_pallet: "Good Pallet",
                    "quantity": 0
                }
              ],
              driver_name: e.driver_name ? e.driver_name : null,
              sender_name: e.sender_name ? e.sender_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectPalletTransfer;