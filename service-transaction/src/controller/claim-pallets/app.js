const {
  addClaimPallets,
  selectClaimPallets,
  updateClaimPallets,
  deleteClaimPallets,
  } = require("../../use-cases/claim-pallets/app");
  // #########
  const claimPalletAdd = require("./insert-claim-pallet");
  const claimPalletSelect = require("./select-claim-pallet");
  const claimPalletUpdate = require("./update-claim-pallet");
  const claimPalletDelete = require("./delete-claim-pallet");
  // #########
  const claimPalletAdds = claimPalletAdd({ addClaimPallets });
  const claimPalletSelects = claimPalletSelect({ selectClaimPallets });
  const claimPalletUpdates = claimPalletUpdate({ updateClaimPallets });
  const claimPalletDeletes = claimPalletDelete({ deleteClaimPallets });
  // #########
  const services = Object.freeze({
    claimPalletAdds,
    claimPalletSelects,
    claimPalletUpdates,
    claimPalletDeletes,
  });
  
  module.exports = services;
  module.exports = {
    claimPalletAdds,
    claimPalletSelects,
    claimPalletUpdates,
    claimPalletDeletes,
  };