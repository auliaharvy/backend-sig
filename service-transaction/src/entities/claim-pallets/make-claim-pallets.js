const makeClaimPallets = ({}) => {
  return function make({
    id_company_distributor,
    price,
    status,
    ber_pallet,
    missing_pallet,
    photo,
    created_by,
    updated_by,
  } = {}) {
    if (!id_company_distributor) {
      throw new Error(`Please enter Distributor.`);
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
      getStatus: () => status,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getPhoto: () => photo,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makeClaimPallets;
