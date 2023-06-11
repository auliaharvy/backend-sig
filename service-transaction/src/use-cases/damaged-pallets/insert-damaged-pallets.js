const addDamagedPallet = ({ makeDamagedPallets, allTransactionDb, damagedPalletDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeDamagedPallets(info); // entity
  
      data = {
        id_company: data.getCompany(),
        id_user_reporter: data.getUser(),
        qty_tbr_pallet: data.getQty(),
        // status: data.getStatus(),
        note: data.getNote(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };
  
      // get TRX NUMBER
      const trxNumber = await damagedPalletDb.getTrxNumber();
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
      const res = await damagedPalletDb.insertNew({ data });
      //   update pallet company
      const updateNewPallet = await damagedPalletDb.updateNewPallet({ data });

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
      // console.log(dataUpdateLogNumber)
      // console.log(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = res.dataValues.id;
      const trans = await damagedPalletDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'DAMAGED PALLET';
        dataAllTransaction.status = 'ISSUED';
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.sender_reporter = dataTrans.reporter_name;
        dataAllTransaction.tbr_pallet = data.qty_tbr_pallet;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      // ##
      let msg = `Error on inserting Damaged Pallet, please try again.`;
  
      if (res) {
        msg = `Damaged Pallet has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addDamagedPallet;