const addBerMissingPallet = ({ makeBerMissingPallets, allTransactionDb, berMissingPalletDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeBerMissingPallets(info); // entity
  
      data = {
        id_company: data.getCompany(),
        id_user_reporter: data.getUser(),
        qty_tbr_pallet: parseInt(data.getQtyTbr()),
        qty_good_pallet: parseInt(data.getQtyGood()),
        qty_ber_missing_pallet: data.getQtyBerMissing(),
        transaction_type: parseInt(data.getTransType()),
        // status: data.getStatus(),
        note: data.getNote(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };
  
      const checkQty = await berMissingPalletDb.checkCompanyQty({ data });
        if (checkQty.rowCount > 0) {
          for (const mstPallet of checkQty.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.qty_good_pallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.qty_tbr_pallet) {
              throw new Error(`The Quantity of TBR Pallet exceeds.`);
            }
          }
        }

      // get TRX NUMBER
      const trxNumber = await berMissingPalletDb.getTrxNumber();
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
      const res = await berMissingPalletDb.insertNew({ data });
      //   update pallet company
      const updatePallet = await berMissingPalletDb.updatePallet({ data });
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

      console.log(res)
      const idTrans = res.dataValues.id;
      const trans = await berMissingPalletDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'BER MISSING PALLET';
        dataAllTransaction.status = 'ISSUED';
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.sender_reporter = dataTrans.reporter_name;
        dataAllTransaction.tbr_pallet = data.qty_tbr_pallet;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      // ##
      let msg = `Error on inserting BER Missing Pallet, please try again.`;
  
      if (res) {
        msg = `BER Missing Pallet has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addBerMissingPallet;