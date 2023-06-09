const addNewPallet = ({ makeNewPallets, newPalletDb, trxNumbersDb, SENDMAIL, NEW_PALLET_TEMPLATE }) => {
    return async function post(info) {
      let data = await makeNewPallets(info); // entity
  
      data = {
        id_trx_change_quota: data.getTrxChangeQuota(),
        id_company_workshop: data.getCompany(),
        qty_request_pallet: data.getQtyRequest(),
        qty_ready_pallet: data.getQtyReady(),
        status: data.getStatus(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };

      // TODO penambahan fungsi untuk melihat apakah id change kuota sudah terbuat new palletnya atau belum, jika sudah maka error
  
      // get TRX NUMBER
      const trxNumber = await newPalletDb.getTrxNumber();
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

      //   insert Pallet Transfer
      const res = await newPalletDb.insertNew({ data });

      // update trxNumber
      const dataUpdateTrxNumber = {
        id: dataTrxNumber.id,
        increment_number: incrNumber ++,
      };
      const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

      // SEND MAIL
        // get data SJP
        const idTrans = res.dataValues.id;
        const trans = await newPalletDb.selectOne({ id: idTrans });
        console.log(trans)
        if (trans.rowCount > 0) {
          const dataTrans = trans.rows[0];
          console.log(dataTrans)
          data.company_name = dataTrans.company_name;
          data.email_workshop = dataTrans.email_workshop;
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: data.email_workshop, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: NEW_PALLET_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });

      // ##
      let msg = `Error on inserting New Pallet, please try again.`;
  
      if (res) {
        msg = `New Pallet has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addNewPallet;