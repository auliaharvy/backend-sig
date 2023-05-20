const updatePalletTransfer = ({ palletTransfersDb, patchPalletTransfers }) => {
    return async function put({ id, ...info }) {
      let data = patchPalletTransfers(id, info);

      
      data = {
        id: data.getId(),
        id_company_departure: data.getDeparture(),
        id_company_destination: data.getDestination(),
        id_company_transporter: data.getTransporter(),
        id_user_approver: data.getApprover(),
        id_user_checker_receiver: data.getReceiver(),
        id_user_checker_sender: data.getSender(),
        id_truck: data.getTruck(),
        id_driver: data.getDriver(),
        status: data.getStatus(),
        reason: data.getReason(),
        note: data.getNote(),
        good_pallet: data.getGoodPallet(),
        tbr_pallet: data.getTbrPallet(),
        ber_pallet: data.getBerPallet(),
        missing_pallet: data.getMissingPallet(),
        update_type: data.getUpdateType(),
        // createdBy: data.getCreatedBy(),
        updatedBy: data.getUpdatedBy(),
      };

      if (data.update_type == 'approval') {
        // check id if employee exist
        const checkId = await palletTransfersDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`Pallet Transfer doesn't exist, please check.`);

        // update
        const res = await palletTransfersDb.approval({ data });
    
        let msg = `Pallet Transfer was not updated, please try again`;
        if (res[0] == 1) {
          msg = `Pallet Transfer updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }

      if (data.update_type == 'sending') {
        // check id if employee exist
        const checkId = await palletTransfersDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`Pallet Transfer doesn't exist, please check.`);

        // update table trx_pallet_transfer
        const res = await palletTransfersDb.sending({ data });

        // update table pallet quanttity
        const resUpdateQty = await palletTransfersDb.updatePalletQtySending({ data });
    
        let msg = `Pallet Transfer was not updated, please try again`;
        if (res[0] == 1) {
          msg = `Pallet Transfer updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }

      if (data.update_type == 'receiving') {
        // check id if employee exist
        const checkId = await palletTransfersDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`Pallet Transfer doesn't exist, please check.`);

        // update table trx_pallet_transfer
        const res = await palletTransfersDb.receiving({ data });

        // update table pallet quanttity
        const resUpdateQty = await palletTransfersDb.updatePalletQtyReceiving({ data });
    
        let msg = `Pallet Transfer was not updated, please try again`;
        if (res[0] == 1) {
          msg = `Pallet Transfer updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }
        
      
    };
  };
  
  module.exports = updatePalletTransfer;