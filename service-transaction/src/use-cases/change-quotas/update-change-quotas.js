const updateChangeQuota = ({ changeQuotaDb, patchChangeQuotas, SENDMAIL, CHANGE_QUOTA_APPROVAL_TEMPLATE }) => {
  return async function put({ id, ...info }) {
    let data = patchChangeQuotas(id, info);

    data = {
      id: data.getId(),
      id_company_requester: data.getCompany(),
      id_approver: data.getApprover(),
      approved_quantity: data.getQuantity(),
      status: data.getStatus(),
      type: data.getType(),
      note: data.getNote(),
      updated_by: data.getUpdatedBy(),
    };

    // check id if employee exist
    const checkId = await changeQuotaDb.selectOne({ id: data.id });
    if (checkId.rowCount == 0)
      throw new Error(`Change Quota doesn't exist, please check.`);

    // update
    const res = await changeQuotaDb.approval({ data });

    // SEND MAIL
        // get data SJP
        const idTrans = data.id;
        const trans = await changeQuotaDb.selectOne({ id: idTrans });
        if (trans.rowCount > 0) {
          if(data.type == 0) {
            data.type_name = 'Addition'
          } else {
            data.type_name = 'Reduction'
          } 
          if(data.status == 1) {
            data.status_name = 'Approved'
          } if(data.status == 2) {
            data.status_name = 'Rejected'
          }
          const dataTrans = trans.rows[0];
          data.company_name = dataTrans.company_name;
          data.trx_number = dataTrans.trx_number;
          data.reason = dataTrans.reason;
          data.quantity = dataTrans.quantity;
          data.requester_email = dataTrans.requester_email;
          data.requester_name = dataTrans.requester_name;
          data.approver_name = dataTrans.approver_name;
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: data.requester_email, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CHANGE_QUOTA_APPROVAL_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });

    let msg = `Change Quota was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Change Quota updated successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = updateChangeQuota;
