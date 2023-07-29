const updateSjpStatus = ({ sjpStatusDb, patchSjpStatuss, allTransactionDb, trxNumbersDb }) => {
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
          throw new Error(`Pallet yang di terima tidak boleh melebihi pallet yang di kirim atau ` + totalSendPallet);
        } 

        // check pallet di transporter agar tidak mines
        const check = await sjpStatusDb.checkTransporterQty({ data });
        if (check.rowCount > 0) {
          //(check)
          for (const mstPallet of check.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < totalReceivedPallet) {
              throw new Error(`Jumlah Good Pallet tidak mencukupi.`);
            }
          }
          
        }

        //   Update SJP Status
        const res = await sjpStatusDb.receiving({ data });

        // update pallet quantity
        const resUpdateQty = await sjpStatusDb.updatePalletQtyReceiving({ data });
        // update trx_status SJP
        const trx_statusSjp = await sjpStatusDb.updateStatusSjp({ data });

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
      // //(dataUpdateLogNumber)
      // //(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = data.id;
      const trans = await sjpStatusDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        const resPalletQuantity = await sjpStatusDb.getPalletQuantity(dataTrans.id);

      var qtyGoodPallet = 0;
      var qtyTbrPallet = 0;
      var qtyBerPallet = 0;
      var qtyMissingPallet = 0;
      for (const qtyPallet of resPalletQuantity.rows) {
        if (qtyPallet.kondisi_pallet == "Good Pallet") {
          qtyGoodPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "TBR Pallet") {
          qtyTbrPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "BER Pallet") {
          qtyBerPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "Missing Pallet") {
          qtyMissingPallet = parseInt(qtyPallet.quantity);
        }
      }
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id_sjp;
        dataAllTransaction.id_sjp_status = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'SJP STATUS';
        dataAllTransaction.status = 'RECEIVE';
        dataAllTransaction.sender_reporter = dataTrans.sender_name;
        dataAllTransaction.receiver_approver = dataTrans.receiver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.good_pallet = qtyGoodPallet;
        dataAllTransaction.tbr_pallet = qtyTbrPallet;
        dataAllTransaction.ber_pallet = qtyBerPallet;
        dataAllTransaction.missing_pallet = qtyMissingPallet;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });
    
        let msg = `SJP Status gagal di update, mohon ulangi kembali`;
        if (res[0] == 1) {
          msg = `SJP Status berhasil diupdate.`;
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
          throw new Error(`Pallet yang di terima tidak boleh melebihi pallet yang dikirim atau ` + totalSendPallet);
        } 

        var jumlahPalletTransporter = 0;
        // check pallet di transporter agar tidak mines
        const check = await sjpStatusDb.checkTransporterQty({ data });
        if (check.rowCount > 0) {
          //(check)
          for (const mstPallet of check.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet') {
              // throw new Error(`Jumlah pallet di transporter tidak mencukupi.`);
              jumlahPalletTransporter = jumlahPalletTransporter + mstPallet.quantity
            } if (mstPallet.kondisi_pallet == 'TBR Pallet') {
              // throw new Error(`Jumlah pallet di transporter tidak mencukupi.`);
              jumlahPalletTransporter = jumlahPalletTransporter + mstPallet.quantity
            }
          } if (jumlahPalletTransporter < totalReceivedPallet) {
            throw new Error(`Jumlah pallet di transporter tidak mencukupi.`);
          }
          
        }

        //   Update SJP Status
        const res = await sjpStatusDb.receiving({ data });

        // update pallet quantity
        const resUpdateQty = await sjpStatusDb.updatePalletQtyReceiving({ data });
        // update trx_status SJP
        const trx_statusSjp = await sjpStatusDb.updateStatusSjp({ data });

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
      // //(dataUpdateLogNumber)
      // //(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = data.id;
      const trans = await sjpStatusDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        const resPalletQuantity = await sjpStatusDb.getPalletQuantity(dataTrans.id);

      var qtyGoodPallet = 0;
      var qtyTbrPallet = 0;
      var qtyBerPallet = 0;
      var qtyMissingPallet = 0;
      for (const qtyPallet of resPalletQuantity.rows) {
        if (qtyPallet.kondisi_pallet == "Good Pallet") {
          qtyGoodPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "TBR Pallet") {
          qtyTbrPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "BER Pallet") {
          qtyBerPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "Missing Pallet") {
          qtyMissingPallet = parseInt(qtyPallet.quantity);
        }
      }
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id_sjp;
        dataAllTransaction.id_sjp_status = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'SJP STATUS';
        dataAllTransaction.status = 'RECEIVE SEND BACK';
        dataAllTransaction.sender_reporter = dataTrans.sender_name;
        dataAllTransaction.receiver_approver = dataTrans.receiver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.good_pallet = qtyGoodPallet;
        dataAllTransaction.tbr_pallet = qtyTbrPallet;
        dataAllTransaction.ber_pallet = qtyBerPallet;
        dataAllTransaction.missing_pallet = qtyMissingPallet;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });
    
        let msg = `SJP Status gagal di update, mohon ulangi kembali`;
        if (res[0] == 1) {
          msg = `SJP Status berhasil diupdate.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }
    };
  };
  
  module.exports = updateSjpStatus;