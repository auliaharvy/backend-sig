const patchNewPallet = ({}) => {
  return function make({
    id_trx_change_quota,
    id_company_workshop,
    qty_request_pallet,
    qty_ready_pallet,
    status,
    created_by,
    updated_by,
  } = {}) {
    if (!id_trx_change_quota) {
      throw new Error("Please enter Change Quota Transaction.");
    }
    if (!id_company_workshop) {
      throw new Error("Please enter Company Workshop.");
    }
    if (!qty_request_pallet) {
      throw new Error("Please enter Quantity Request Pallet.");
    }
    if (!status) {
      throw new Error("Please enter Status.");
    }

    return Object.freeze({
      getTrxChangeQuota: () => id_trx_change_quota,
      getCompany: () => id_company_workshop,
      getQtyRequest: () => qty_request_pallet,
      getQtyReady: () => qty_ready_pallet,
      getStatus: () => status,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchNewPallet;
