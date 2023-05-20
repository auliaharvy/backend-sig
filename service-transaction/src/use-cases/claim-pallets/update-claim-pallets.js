const updateClaimPallet = ({ claimPalletDb, patchClaimPallets }) => {
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
      const checkId = await claimPalletDb.selectOne({ id: data.id });
      if (checkId.rowCount == 0)
        throw new Error(`Claim Pallet doesn't exist, please check.`);

      // update
      const res = await claimPalletDb.approvalManager({ data });
  
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
      const checkId = await claimPalletDb.selectOne({ id: data.id });
      if (checkId.rowCount == 0)
        throw new Error(`Claim Pallet doesn't exist, please check.`);

      // update
      const res = await claimPalletDb.approvalDistributor({ data });
  
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
