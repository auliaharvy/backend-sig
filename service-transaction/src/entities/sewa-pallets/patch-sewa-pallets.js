const patchClaimPallets = ({}) => {
  return function make(id, {
    id_company_distributor,
    id_user_distributor,
    id_user_manager,
    status,
    reason_distributor,
    reason_manager,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    update_type,
    created_by,
    updated_by,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of Claim Palet.");
    }
    if (!status) {
      throw new Error("Please enter Status.");
    }

    return Object.freeze({
      getId: () => id,
      getCompany: () => id_company_distributor,
      getUserDistributor: () => id_user_distributor,
      getUserManager: () => id_user_manager,
      getStatus: () => status,
      getReasonDistributor: () => reason_distributor,
      getReasonManager: () => reason_manager,
      getGoodPallet: () => good_pallet,
      getTbrPallet: () => tbr_pallet,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getUpdateType: () => update_type,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchClaimPallets;
