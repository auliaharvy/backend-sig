const updateClaimPallet = ({ claimPalletDb, trxNumbersDb, allTransactionDb,patchClaimPallets, SENDMAIL, CLAIM_PALLET_APPROVAL_MANAGER_TEMPLATE }) => {
  return async function put({ id, ...info }) {
    let data = patchClaimPallets(id, info);

    data = {
      id: data.getId(),
      id_company_distributor: data.getCompany(),
      id_user_distributor: data.getUserDistributor(),
      id_user_manager: data.getUserManager(),
      status: data.getStatus(),
      reason_distributor: data.getReasonDistributor(),
      reason_manager: data.getReasonManager(),
      ber_pallet: data.getBerPallet(),
      missing_pallet: data.getMissingPallet(),
      updated_by: data.getUpdatedBy(),
      update_type: data.getUpdateType(),
    };

    if (data.update_type == 'approval_manager') {
      // check id if employee exist
      const checkIds = await claimPalletDb.selectOne({ id: data.id });
      if (checkIds.rowCount == 0)
        throw new Error(`Claim Pallet doesn't exist, please check.`);

      // update
      const res = await claimPalletDb.approvalManager({ data });

      const checkId = await claimPalletDb.selectOne({ id: data.id });

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

      const idTrans = data.id;
      const trans = await claimPalletDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_claim_pallet = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'CLAIM PALLET';
        if(data.status == 1) {
          dataAllTransaction.status = 'APPROVE MANAGER';
        } if(data.status == 2) {
          dataAllTransaction.status = 'REJECT MANAGER';
        }
        dataAllTransaction.receiver_approver = dataTrans.manager_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.reason = dataTrans.reason_manager;
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.price = dataTrans.price;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      if(data.status == 1) {
        // SEND MAIL
        // get data SJP
        if (checkId.rowCount > 0) {
          const dataTrans = checkId.rows[0];
          console.log(dataTrans)
          data.company_name = dataTrans.company_name;
          data.trx_number = dataTrans.trx_number;
          data.company_email = dataTrans.company_email;
          data.status = 'Approved'
          data.approver = dataTrans.manager_name
          data.total_price = parseInt(dataTrans.price) * (data.ber_pallet + data.missing_pallet);
          data.price = parseInt(dataTrans.price);
        }
        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: data.company_email, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CLAIM_PALLET_APPROVAL_MANAGER_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });
      }
  
      let msg = `Claim Pallet was not updated, please try again`;
      if (res[0] == 1) {
        msg = `Claim Pallet updated successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    }

    if (data.update_type == 'approval_distributor') {
      // check id if employee exist
      const checkIds = await claimPalletDb.selectOne({ id: data.id });
      if (checkIds.rowCount == 0)
        throw new Error(`Claim Pallet doesn't exist, please check.`);

      // update
      const res = await claimPalletDb.approvalDistributor({ data });

      const checkId = await claimPalletDb.selectOne({ id: data.id });

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

      const idTrans = data.id;
      const trans = await claimPalletDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_claim_pallet = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'CLAIM PALLET';
        if(data.status == 3) {
          dataAllTransaction.status = 'APPROVE DISTRIBUTOR';
        } if(data.status == 4) {
          dataAllTransaction.status = 'REJECT DISTRIBUTOR';
        }
        dataAllTransaction.receiver_approver = dataTrans.pic_distributor;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.reason = dataTrans.reason_distributor;
        dataAllTransaction.company = dataTrans.company_name;
        dataAllTransaction.price = dataTrans.price;
        dataAllTransaction.ber_pallet = data.ber_pallet;
        dataAllTransaction.missing_pallet = data.missing_pallet;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      if(data.status == 3) {
        // SEND MAIL
        // get data SJP
        if (checkId.rowCount > 0) {
          const dataTrans = checkId.rows[0];
          console.log(dataTrans)
          data.company_name = dataTrans.company_name;
          data.trx_number = dataTrans.trx_number;
          data.company_email = dataTrans.company_email;
          data.status = 'Approved'
          data.approver = dataTrans.manager_name
          data.manager_email = dataTrans.manager_email
          data.total_price = parseInt(dataTrans.price) * (data.ber_pallet + data.missing_pallet);
          data.price = parseInt(dataTrans.price);
        }
        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: data.manager_email, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CLAIM_PALLET_APPROVAL_MANAGER_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });
      }
  
      let msg = `Claim Pallet was not updated, please try again`;
      if (res[0] == 1) {
        msg = `Claim Pallet updated successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    }

  };
};

module.exports = updateClaimPallet;
