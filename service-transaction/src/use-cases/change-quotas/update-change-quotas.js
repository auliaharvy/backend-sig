const updateChangeQuota = ({ changeQuotaDb, patchChangeQuotas }) => {
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
