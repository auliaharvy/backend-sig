const makePalletRealizations = ({}) => {
  return function make({
    id_trx_new_pallet,
    qty_pallet,
    created_by,
    updated_by,
  } = {}) {
    if (!id_trx_new_pallet) {
      throw new Error("Please enter New Pallet Number.");
    }
    if (!qty_pallet) {
      throw new Error("Please enter Realization Quantity.");
    }

    return Object.freeze({
      getNewPallet: () => id_trx_new_pallet,
      getQty: () => qty_pallet,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makePalletRealizations;
