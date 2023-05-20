const makeDamagedPallets = ({}) => {
  return function make({
    id_company,
    id_user_reporter,
    qty_tbr_pallet,
    note,
    created_by,
    updated_by,
  } = {}) {
    if (!id_company) {
      throw new Error("Please enter Company.");
    }
    if (!id_user_reporter) {
      throw new Error("Please enter User.");
    }
    if (!qty_tbr_pallet) {
      throw new Error("Please enter TRB Pallet Quantity.");
    }

    return Object.freeze({
      getCompany: () => id_company,
      getUser: () => id_user_reporter,
      getQty: () => qty_tbr_pallet,
      getNote: () => note,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makeDamagedPallets;
