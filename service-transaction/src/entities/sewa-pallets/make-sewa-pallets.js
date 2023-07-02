const makeSewaPallets = ({}) => {
  return function make({
    id_company_distributor,
    price,
    total,
    status,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    photo,
    created_by,
    updated_by,
  } = {}) {
    if (!id_company_distributor) {
      throw new Error("Please enter Distributor.");
    }
    if (!price) {
      throw new Error("Please enter Price.");
    }
    if (!photo) {
      throw new Error("Please enter Photo.");
    }

    return Object.freeze({
      getCompany: () => id_company_distributor,
      getPrice: () => price,
      getTotal: () => total,
      getStatus: () => status,
      getGoodPallet: () => good_pallet,
      getTbrPallet: () => tbr_pallet,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getPhoto: () => photo,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makeSewaPallets;
