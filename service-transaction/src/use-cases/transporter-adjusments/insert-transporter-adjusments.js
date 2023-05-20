const addTransporterAdjusment = ({ makeTransporterAdjusments, transporterAdjusmentDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeTransporterAdjusments(info); // entity
  
      data = {
        id_company_transporter: data.getCompanyTransporter(),
        id_company: data.getCompany(),
        id_user_reporter: data.getUser(),
        is_from_pool: data.getType(),
        good_pallet: data.getGood(),
        tbr_pallet: data.getTbr(),
        ber_pallet: data.getBer(),
        missing_pallet: data.getMissing(),
        // status: data.getStatus(),
        note: data.getNote(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };

      console.log(data)
      // to do checking if company transporter not transporter
      const check = await transporterAdjusmentDb.checkCompany({
        data,
      });
      if (check.rows[0].name_company_type != 'Transporter')
        throw new Error(`Company Transporter is not transporter, please check.`);

      // check Quantity
      const checkQuantity = await transporterAdjusmentDb.checkQty({ data });
      if (checkQuantity.rowCount > 0) {
        for (const mstPallet of checkQuantity.rows) {
          if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.good_pallet) {
            throw new Error(`The Quantity of Good Pallet exceeds woy.`);
          }
          else if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.tbr_pallet) {
            throw new Error(`The Quantity of TBR Pallet exceeds woy.`);
          }
          else if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
            throw new Error(`The Quantity of BER Pallet exceeds woy.`);
          }
          else if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
            throw new Error(`The Quantity of Missing Pallet exceeds woy.`);
          }
        }
        
      } else {
        
        throw new Error(`No company data, please check.`);
      }
  
      // get TRX NUMBER
      const trxNumber = await transporterAdjusmentDb.getTrxNumber();
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

      //   insert Transporter Adjusment
      const res = await transporterAdjusmentDb.insertNew({ data });
      //   update pallet company
      const updateNewPallet = await transporterAdjusmentDb.updatePalletQty({ data });

      // update trxNumber
      const dataUpdateTrxNumber = {
        id: dataTrxNumber.id,
        increment_number: incrNumber ++,
      };
      const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

      // ##
      let msg = `Error on inserting Transporter Adjusment, please try again.`;
  
      if (res) {
        msg = `Transporter Adjusment has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addTransporterAdjusment;