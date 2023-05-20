const updateSewaPallet = ({ sewaPalletDb, patchSewaPallets }) => {
  return async function put({ id, ...info }) {
    let data = patchSewaPallets(id, info);

    data = {
      id: data.getId(),
      id_company_distributor: data.getCompany(),
      id_user_distributor: data.getUserDistributor(),
      id_user_manager: data.getUserManager(),
      status: data.getStatus(),
      reason_distributor: data.getReasonDistributor(),
      reason_manager: data.getReasonManager(),
      updated_by: data.getUpdatedBy(),
      update_type: data.getUpdateType(),
    };

    if (data.update_type == 'approval_manager') {
      // check id if employee exist
      const checkId = await sewaPalletDb.selectOne({ id: data.id });
      if (checkId.rowCount == 0)
        throw new Error(`Sewa Pallet doesn't exist, please check.`);

      // update
      const res = await sewaPalletDb.approvalManager({ data });
  
      let msg = `Sewa Pallet was not updated, please try again`;
      if (res[0] == 1) {
        msg = `Sewa Pallet updated successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    }

    if (data.update_type == 'approval_distributor') {
      // check id if employee exist
      const checkId = await sewaPalletDb.selectOne({ id: data.id });
      if (checkId.rowCount == 0)
        throw new Error(`Sewa Pallet doesn't exist, please check.`);

      // update
      const res = await sewaPalletDb.approvalDistributor({ data });
  
      let msg = `Sewa Pallet was not updated, please try again`;
      if (res[0] == 1) {
        msg = `Sewa Pallet updated successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    }

  };
};

module.exports = updateSewaPallet;
