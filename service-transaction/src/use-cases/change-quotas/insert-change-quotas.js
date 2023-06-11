const addChangeQuota = ({ makeChangeQuotas, changeQuotaDb, allTransactionDb, trxNumbersDb, SENDMAIL, CHANGE_QUOTA_TEMPLATE }) => {
    return async function post(info) {
      let data = await makeChangeQuotas(info); // entity
  
      data = {
        id_company_requester: data.getCompany(),
        id_requester: data.getRequester(),
        quantity: data.getQuantity(),
        type: data.getType(),
        reason: data.getReason(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
      };
  
      // get TRX NUMBER
      const trxNumber = await changeQuotaDb.getTrxNumber();
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
      const res = await changeQuotaDb.insertNew({ data });

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
      const trans = await changeQuotaDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_change_quota = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        if(data.type == 0){
          dataAllTransaction.transaction = 'CHANGE QUOTA ADDITION';
        } else {
          dataAllTransaction.transaction = 'CHANGE QUOTA REDUCTION';
        }
        dataAllTransaction.status = 'DRAFT';
        dataAllTransaction.sender_reporter = dataTrans.requester_name;
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.note = data.note;
        dataAllTransaction.reason = data.reason;
        dataAllTransaction.good_pallet = data.quantity;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      // SEND MAIL
        // get data SJP
        if (trans.rowCount > 0) {
          if(data.type == 0) {
            data.type_name = 'Addition'
          } else {
            data.type_name = 'Reduction'
          }
          const dataTrans = trans.rows[0];
          data.company_name = dataTrans.company_name;
          data.requester_name = dataTrans.requester_name;
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: 'auliaharvy@gmail.com', // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CHANGE_QUOTA_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });

      // ##
      let msg = `Error on inserting Change Quota, please try again.`;
  
      if (res) {
        msg = `Change Quota has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addChangeQuota;