const updateSjpStatus = ({ sjpStatusDb, patchSjpStatuss }) => {
    return async function put({ id, ...info }) {
      let data = patchSjpStatuss(id, info);

      
      data = {
        id: id,
        id_sjp: data.getSjp(),
        id_user_receiver: data.getReceiver(),
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_transporter_company: data.getTransporter(),
        receiving_driver_approval: data.getDriverApproval(),
        status: data.getStatus(),
        is_sendback: data.getIsSendback(),
        note: data.getNote(),
        send_good_pallet: data.getSendGoodPallet(),
        send_tbr_pallet: data.getSendTbrPallet(),
        send_ber_pallet: data.getSendBerPallet(),
        send_missing_pallet: data.getSendMissingPallet(),
        good_pallet: data.getGoodPallet(),
        tbr_pallet: data.getTbrPallet(),
        ber_pallet: data.getBerPallet(),
        missing_pallet: data.getMissingPallet(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
        sjp_status: data.getSjpStatus(),
      };

      if (data.is_sendback == 0) {

        // check palet yang di terima melebihi yang dikirm
        var totalReceivedPallet = parseInt(data.good_pallet) + parseInt(data.tbr_pallet) + parseInt(data.ber_pallet) + parseInt(data.missing_pallet);
        var totalSendPallet = parseInt(data.send_good_pallet) + parseInt(data.send_tbr_pallet) + parseInt(data.send_ber_pallet) + parseInt(data.send_missing_pallet);

        data.totalReceivedPallet = totalReceivedPallet;
        data.totalSendPallet = totalSendPallet;
        if (totalReceivedPallet > totalSendPallet) {
          throw new Error(`Received Pallet cannot be greater than pallet send or ` + totalSendPallet);
        } 

        // check pallet di transporter agar tidak mines
        const check = await sjpStatusDb.checkTransporterQty({ data });
        if (check.rowCount > 0) {
          console.log(check)
          for (const mstPallet of check.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < totalReceivedPallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
          }
          
        }

        //   Update SJP Status
        const res = await sjpStatusDb.receiving({ data });

        // update pallet quantity
        const resUpdateQty = await sjpStatusDb.updatePalletQtyReceiving({ data });
        // update trx_status SJP
        const trx_statusSjp = await sjpStatusDb.updateStatusSjp({ data });
    
        let msg = `SJP Status not updated, please try again`;
        if (res[0] == 1) {
          msg = `SJP Status updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }

      if (data.is_sendback == 1) {
        // check palet yang di terima melebihi yang dikirm
        var totalReceivedPallet = parseInt(data.good_pallet) + parseInt(data.tbr_pallet) + parseInt(data.ber_pallet) + parseInt(data.missing_pallet);
        var totalSendPallet = parseInt(data.send_good_pallet) + parseInt(data.send_tbr_pallet) + parseInt(data.send_ber_pallet) + parseInt(data.send_missing_pallet);

        data.totalReceivedPallet = totalReceivedPallet;
        data.totalSendPallet = totalSendPallet;
        if (totalReceivedPallet > totalSendPallet) {
          throw new Error(`Received Pallet cannot be greater than pallet send or ` + totalSendPallet);
        } 

        // check pallet di transporter agar tidak mines
        const check = await sjpStatusDb.checkTransporterQty({ data });
        if (check.rowCount > 0) {
          console.log(check)
          for (const mstPallet of check.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < totalReceivedPallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
          }
          
        }

        //   Update SJP Status
        const res = await sjpStatusDb.receiving({ data });

        // update pallet quantity
        const resUpdateQty = await sjpStatusDb.updatePalletQtyReceiving({ data });
        // update trx_status SJP
        const trx_statusSjp = await sjpStatusDb.updateStatusSjp({ data });
    
        let msg = `SJP Status was not updated, please try again`;
        if (res[0] == 1) {
          msg = `SJP Status updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }
    };
  };
  
  module.exports = updateSjpStatus;