const addPalletRealization = ({ makePalletRealizations, allTransactionDb, palletRealizationDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makePalletRealizations(info); // entity
  
      data = {
        id_trx_new_pallet: data.getNewPallet(),
        qty_pallet: data.getQty(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };
  
      // get TRX NUMBER
      const trxNumber = await palletRealizationDb.getTrxNumber();
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

      //   insert Pallet Relaization
      const res = await palletRealizationDb.insertNew({ data });
      //   update New Transfer
      const updateNewPallet = await palletRealizationDb.updateNewPallet({ data });

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
      const trans = await palletRealizationDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_new_pallet_realisation = dataTrans.id;
        dataAllTransaction.id_new_pallet = dataTrans.id_trx_new_pallet;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'NEW PALLET REALIZATION';
        dataAllTransaction.status = 'ADD';
        dataAllTransaction.good_pallet = data.qty_pallet;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      // ##
      let msg = `Error on inserting Pallet Realization, please try again.`;
  
      if (res) {
        msg = `Pallet Realization has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addPalletRealization;