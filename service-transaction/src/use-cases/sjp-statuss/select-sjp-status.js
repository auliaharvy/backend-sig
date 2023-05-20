const selectSjpStatus = ({ sjpStatusDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await sjpStatusDb.selectOne({ id });

        // mendapatkan jumlah pallet di pallet transfer
        const resPalletQuantity = await sjpStatusDb.getPalletQuantity(
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
              id_sjp: e.id_sjp ? e.id_sjp : null,
              id_user_sender: e.id_user_sender ? e.id_user_sender : null,
              id_user_receiver: e.id_user_receiver ? e.id_user_receiver : null,
              id_departure_company: e.id_departure_company ? e.id_departure_company : null,
              id_destination_company: e.id_destination_company ? e.id_destination_company : null,
              id_transporter_company: e.id_transporter_company ? e.id_transporter_company : null,
              trx_number: e.trx_number ? e.trx_number : null,
              sjp_number: e.sjp_number ? e.sjp_number : null,
              status: e.status ? e.status : 0,
              is_sendback: e.is_sendback ? e.is_sendback : 0,
              sending_driver_approval: e.sending_driver_approval ? e.sending_driver_approval : 0,
              receiving_driver_approval: e.receiving_driver_approval ? e.receiving_driver_approval : 0,
              departure_company: e.departure_company ? e.departure_company : null,
              destination_company: e.destination_company ? e.destination_company : null,
              transporter_company: e.transporter_company ? e.transporter_company : null,
              sender_name: e.sender_name ? e.sender_name : null,
              receiver_name: e.receiver_name ? e.receiver_name : null,
              note: e.note ? e.note : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await sjpStatusDb.selectAll({});

        // mendapatkan jumlah pallet di pallet transfer
        const resPalletQuantity = await sjpStatusDb.getPalletQuantity(
          id
        );

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            const resPalletQuantity = await sjpStatusDb.getPalletQuantity(
              e.id
            );
            // push items to array
            data.push({
              id: e.id,
              id_sjp: e.id_sjp ? e.id_sjp : null,
              id_user_sender: e.id_user_sender ? e.id_user_sender : null,
              id_user_receiver: e.id_user_receiver ? e.id_user_receiver : null,
              id_departure_company: e.id_departure_company ? e.id_departure_company : null,
              id_destination_company: e.id_destination_company ? e.id_destination_company : null,
              id_transporter_company: e.id_transporter_company ? e.id_transporter_company : null,
              trx_number: e.trx_number ? e.trx_number : null,
              sjp_number: e.sjp_number ? e.sjp_number : null,
              status: e.status ? e.status : 0,
              is_sendback: e.is_sendback ? e.is_sendback : 0,
              sending_driver_approval: e.sending_driver_approval ? e.sending_driver_approval : 0,
              receiving_driver_approval: e.receiving_driver_approval ? e.receiving_driver_approval : 0,
              departure_company: e.departure_company ? e.departure_company : null,
              destination_company: e.destination_company ? e.destination_company : null,
              transporter_company: e.transporter_company ? e.transporter_company : null,
              sender_name: e.sender_name ? e.sender_name : null,
              receiver_name: e.receiver_name ? e.receiver_name : null,
              note: e.note ? e.note : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectSjpStatus;