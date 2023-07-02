const addClaimPallet = ({ makeClaimPallets, allTransactionDb, claimPalletDb, trxNumbersDb, SENDMAIL, CLAIM_PALLET_ADD_TEMPLATE }) => {
    return async function post(info) {
      let data = await makeClaimPallets(info); // entity
  
      data = {
        id_company_distributor: data.getCompany(),
        price: data.getPrice(),
        status: data.getStatus(),
        ber_pallet: data.getBerPallet(),
        missing_pallet: data.getMissingPallet(),
        photo: data.getPhoto(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };

      
      const checkQty = await claimPalletDb.checkCompanyQty({ data });
        if (checkQty.rowCount > 0) {
          for (const mstPallet of checkQty.rows) {
            if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
              throw new Error(`The Quantity of BER Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
              throw new Error(`The Quantity of Missing Pallet exceeds.`);
            }
          }
        }

      // get TRX NUMBER
      const trxNumber = await claimPalletDb.getTrxNumber();
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

      //   insert Pallet Claim
      const res = await claimPalletDb.insertNew({ data });

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
      const trans = await claimPalletDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_claim_pallet = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'CLAIM PALLET';
        dataAllTransaction.status = 'DRAFT';
        dataAllTransaction.price = data.price;
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.reason = dataTrans.reason;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

       // SEND MAIL
        // get data SJP
        console.log(trans)
        if (trans.rowCount > 0) {
          const dataTrans = trans.rows[0];
          data.company_name = dataTrans.company_name;
          data.total_price = parseInt(data.price) * (data.ber_pallet + data.missing_pallet);
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: "auliaharvy@gmail.com", // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CLAIM_PALLET_ADD_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });

      // ##
      let msg = `Error on inserting Claim Pallet, please try again.`;
  
      if (res) {
        msg = `Claim Pallet has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addClaimPallet;