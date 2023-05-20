const addDamagedPallet = ({ makeDamagedPallets, damagedPalletDb, trxNumbersDb }) => {
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