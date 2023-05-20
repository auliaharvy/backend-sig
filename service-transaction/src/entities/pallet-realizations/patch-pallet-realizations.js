const patchPalletRealizations = ({}) => {
  return function make(id, {
    id_trx_new_pallet,
    qty_pallet,
    created_by,
    updated_by,
  } = {}) {
    if (!id_trx_new_pallet) {
      throw new Error("Please enter New Pallet Number.");
    }

    return Object.freeze({
      getNewPallet: () => id_trx_new_pallet,
      getQty: () => qty_pallet,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchPalletRealizations;
