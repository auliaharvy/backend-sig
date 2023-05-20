const addRepairedPallet = ({ makeRepairedPallets, repairedPalletDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeRepairedPallets(info); // entity
  
      data = {
        id_company: data.getCompany(),
        id_user_reporter: data.getUser(),
        qty_good_pallet: data.getQty(),
        // status: data.getStatus(),
        note: data.getNote(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };

      // to do checking if company not workshop
      const check = await repairedPalletDb.checkCompany({
        data,
      });
      if (check.rows[0].name_company_type != 'Workshop')
        throw new Error(`Company is not workshop, please check.`);
  
      // get TRX NUMBER
      const trxNumber = await repairedPalletDb.getTrxNumber();
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

      //   insert Pallet Repaired
      const res = await repairedPalletDb.insertNew({ data });
      //   update pallet company
      const updateNewPallet = await repairedPalletDb.updateNewPallet({ data });

      // update trxNumber
      const dataUpdateTrxNumber = {
        id: dataTrxNumber.id,
        increment_number: incrNumber ++,
      };
      const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

      // ##
      let msg = `Error on inserting Repaired Pallet, please try again.`;
  
      if (res) {
        msg = `Repaired Pallet has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addRepairedPallet;