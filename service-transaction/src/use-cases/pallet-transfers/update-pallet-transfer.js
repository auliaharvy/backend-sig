const updatePalletTransfer = ({ palletTransfersDb, patchPalletTransfers, trxNumbersDb, allTransactionDb  }) => {
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
        const checkQty = await palletTransfersDb.checkDepartureQty({ data });
        if (checkQty.rowCount > 0) {
          for (const mstPallet of checkQty.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.good_pallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.tbr_pallet) {
              throw new Error(`The Quantity of TBR Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
              throw new Error(`The Quantity of BER Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
              throw new Error(`The Quantity of Missing Pallet exceeds.`);
            }
          }
        }
        // check id if employee exist
        const checkId = await palletTransfersDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`Pallet Transfer doesn't exist, please check.`);

        
        // update
        const res = await palletTransfersDb.approval({ data });

          // all Transaction Record
      // get LOG NUMBER
      const logNumber = await allTransactionDb.getLogNumber();
      const dataLogNumber = logNumber.rows[0];
      var incrLogNumber = parseInt(dataLogNumber.increment_number) + 1;
      var FormatedIncrLogNumber = '';
      if (incrLogNumber < 10) {
        FormatedIncrLogNumber = '000' + incrLogNumber;
      } else if (incrLogNumber < 100) {
        FormatedIncrLogNumber = '00' + incrLogNumber;
      } else if (incrLogNumber < 1000) {
        FormatedIncrLogNumber = '0' + incrLogNumber;
      } else {
        FormatedIncrLogNumber = incrLogNumber;
      }
      data.log_number = dataLogNumber.trx_type + '-' + dataLogNumber.year + dataLogNumber.month + '-' + FormatedIncrLogNumber;
      // update logNumber
      const dataUpdateLogNumber = {
        id: dataLogNumber.id,
        increment_number: incrLogNumber ++,
      };
      // console.log(dataUpdateLogNumber)
      // console.log(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = data.id;
      const trans = await palletTransfersDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_pallet_transfer = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_code;
        dataAllTransaction.transaction = 'PALLET TRANSFER';
        dataAllTransaction.status = 'APPROVAL';
        dataAllTransaction.sender_reporter = dataTrans.approver_name;
        dataAllTransaction.driver_name = dataTrans.driver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.reason = dataTrans.reason;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.truck_number = dataTrans.license_plate;
        dataAllTransaction.good_pallet = data.good_pallet;
        dataAllTransaction.tbr_pallet = data.tbr_pallet;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });
    
        let msg = `Pallet Transfer was not updated, please try again`;
        if (res[0] == 1) {
          msg = `Pallet Transfer updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }

      if (data.update_type == 'sending') {
        const checkQty = await palletTransfersDb.checkDepartureQty({ data });
        if (checkQty.rowCount > 0) {
          for (const mstPallet of checkQty.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.good_pallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.tbr_pallet) {
              throw new Error(`The Quantity of TBR Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
              throw new Error(`The Quantity of BER Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
              throw new Error(`The Quantity of Missing Pallet exceeds.`);
            }
          }
        }

        // check id if employee exist
        const checkId = await palletTransfersDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`Pallet Transfer doesn't exist, please check.`);

        // update table trx_pallet_transfer
        const res = await palletTransfersDb.sending({ data });

        // update table pallet quanttity
        const resUpdateQty = await palletTransfersDb.updatePalletQtySending({ data });

        // all Transaction Record
      // get LOG NUMBER
      const logNumber = await allTransactionDb.getLogNumber();
      const dataLogNumber = logNumber.rows[0];
      var incrLogNumber = parseInt(dataLogNumber.increment_number) + 1;
      var FormatedIncrLogNumber = '';
      if (incrLogNumber < 10) {
        FormatedIncrLogNumber = '000' + incrLogNumber;
      } else if (incrLogNumber < 100) {
        FormatedIncrLogNumber = '00' + incrLogNumber;
      } else if (incrLogNumber < 1000) {
        FormatedIncrLogNumber = '0' + incrLogNumber;
      } else {
        FormatedIncrLogNumber = incrLogNumber;
      }
      data.log_number = dataLogNumber.trx_type + '-' + dataLogNumber.year + dataLogNumber.month + '-' + FormatedIncrLogNumber;
      // update logNumber
      const dataUpdateLogNumber = {
        id: dataLogNumber.id,
        increment_number: incrLogNumber ++,
      };
      // console.log(dataUpdateLogNumber)
      // console.log(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = data.id;
      const trans = await palletTransfersDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_pallet_transfer = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_code;
        dataAllTransaction.transaction = 'PALLET TRANSFER';
        dataAllTransaction.status = 'SEND';
        dataAllTransaction.sender_reporter = dataTrans.sender_name;
        dataAllTransaction.driver_name = dataTrans.driver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.reason = dataTrans.reason;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.truck_number = dataTrans.license_plate;
        dataAllTransaction.good_pallet = data.good_pallet;
        dataAllTransaction.tbr_pallet = data.tbr_pallet;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });
    
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

          const checkQty = await palletTransfersDb.checkCompanyQty({ data });
          if (checkQty.rowCount > 0) {
            for (const mstPallet of checkQty.rows) {
              if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.good_pallet) {
                throw new Error(`The Quantity of Good Pallet exceeds.`);
              }
              if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.tbr_pallet) {
                throw new Error(`The Quantity of TBR Pallet exceeds.`);
              }
              if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
                throw new Error(`The Quantity of BER Pallet exceeds.`);
              }
              if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
                throw new Error(`The Quantity of Missing Pallet exceeds.`);
              }
            }
          }

        // update table trx_pallet_transfer
        const res = await palletTransfersDb.receiving({ data });

        // update table pallet quanttity
        const resUpdateQty = await palletTransfersDb.updatePalletQtyReceiving({ data });

         // all Transaction Record
      // get LOG NUMBER
      const logNumber = await allTransactionDb.getLogNumber();
      const dataLogNumber = logNumber.rows[0];
      var incrLogNumber = parseInt(dataLogNumber.increment_number) + 1;
      var FormatedIncrLogNumber = '';
      if (incrLogNumber < 10) {
        FormatedIncrLogNumber = '000' + incrLogNumber;
      } else if (incrLogNumber < 100) {
        FormatedIncrLogNumber = '00' + incrLogNumber;
      } else if (incrLogNumber < 1000) {
        FormatedIncrLogNumber = '0' + incrLogNumber;
      } else {
        FormatedIncrLogNumber = incrLogNumber;
      }
      data.log_number = dataLogNumber.trx_type + '-' + dataLogNumber.year + dataLogNumber.month + '-' + FormatedIncrLogNumber;
      // update logNumber
      const dataUpdateLogNumber = {
        id: dataLogNumber.id,
        increment_number: incrLogNumber ++,
      };
      // console.log(dataUpdateLogNumber)
      // console.log(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = data.id;
      const trans = await palletTransfersDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_pallet_transfer = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_code;
        dataAllTransaction.transaction = 'PALLET TRANSFER';
        dataAllTransaction.status = 'RECEIVE';
        dataAllTransaction.receiver_approver = dataTrans.receiver_name;
        dataAllTransaction.driver_name = dataTrans.driver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.reason = dataTrans.reason;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.truck_number = dataTrans.license_plate;
        dataAllTransaction.good_pallet = data.good_pallet;
        dataAllTransaction.tbr_pallet = data.tbr_pallet;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });
    
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