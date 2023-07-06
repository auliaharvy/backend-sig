const addSewaPallet = ({ makeSewaPallets, sewaPalletDb, allTransactionDb, trxNumbersDb, SENDMAIL, SEWA_PALLET_ADD_TEMPLATE }) => {
    return async function post(info) {
      let data = await makeSewaPallets(info); // entity
  
      data = {
        id_company_distributor: data.getCompany(),
        price: data.getPrice(),
        total: data.getTotal(),
        status: data.getStatus(),
        good_pallet: data.getGoodPallet(),
        tbr_pallet: data.getTbrPallet(),
        ber_pallet: data.getBerPallet(),
        missing_pallet: data.getMissingPallet(),
        photo: data.getPhoto(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };
  
      // get TRX NUMBER
      const trxNumber = await sewaPalletDb.getTrxNumber();
      const dataTrxNumber = trxNumber.rows[0];
      var incrNumber = parseInt(dataTrxNumber.increment_number) + 1;
      var FormatedIncrNumber = '';
      if (incrNumber < 10) {
        FormatedIncrNumber = '000' + incrNumber;
      } else if (incrNumber < 100) {
        FormatedIncrNumber = '00' + incrNumber;
      } else if (incrNumber < 1000) {
        FormatedIncrNumber = '0' + incrNumber;
      } else {
        FormatedIncrNumber = incrNumber;
      }
      data.trx_number = dataTrxNumber.trx_type + '-' + dataTrxNumber.year + dataTrxNumber.month + '-' + FormatedIncrNumber;

      //   insert Pallet Sewa
      const res = await sewaPalletDb.insertNew({ data });

      // update trxNumber
      const dataUpdateTrxNumber = {
        id: dataTrxNumber.id,
        increment_number: incrNumber ++,
      };
      const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

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

      const idTrans = res.dataValues.id;
        const trans = await sewaPalletDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_biaya_sewa = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'SEWA PALLET';
        dataAllTransaction.status = 'DRAFT';
        dataAllTransaction.price = data.price;
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.good_pallet = data.good_pallet;
        dataAllTransaction.tbr_pallet = data.tbr_pallet;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.reason = dataTrans.reason;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      // SEND MAIL
        // get data SJP
        
        //(trans)
        if (trans.rowCount > 0) {
          const dataTrans = trans.rows[0];
          data.company_name = dataTrans.company_name;
          data.total_price = parseInt(data.price) * (data.ber_pallet + data.missing_pallet + data.good_pallet + data.tbr_pallet);
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: "auliaharvy@gmail.com", // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: SEWA_PALLET_ADD_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          //("Email sent successfully");
          //("MESSAGE ID: ", info.messageId);
        });

      // ##
      let msg = `Error on inserting Sewa Pallet, please try again.`;
  
      if (res) {
        msg = `Sewa Pallet has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addSewaPallet;