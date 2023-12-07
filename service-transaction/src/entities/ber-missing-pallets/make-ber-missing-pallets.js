const makeBerMissingPallets = ({}) => {
  return function make({
    id_company,
    id_user_reporter,
    qty_good_pallet,
    qty_tbr_pallet,
    qty_ber_missing_pallet,
    transaction_type,
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
    if (!transaction_type) {
      throw new Error("Please enter Transaction Type.");
    }
    return Object.freeze({
      getCompany: () => id_company,
      getUser: () => id_user_reporter,
      getQtyGood: () => qty_good_pallet,
      getQtyTbr: () => qty_tbr_pallet,
      getQtyBerMissing: () => qty_ber_missing_pallet,
      getTransType: () => transaction_type,
      getNote: () => note,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makeBerMissingPallets;
