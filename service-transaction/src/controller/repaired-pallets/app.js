const {
  addRepairedPallets,
  selectRepairedPallets,
  updateRepairedPallets,
  deleteRepairedPallets,
  } = require("../../use-cases/repaired-pallets/app");
  // #########
  const repairedPalletAdd = require("./insert-repaired-pallet");
  const repairedPalletSelect = require("./select-repaired-pallet");
  const repairedPalletUpdate = require("./update-repaired-pallet");
  const repairedPalletDelete = require("./delete-repaired-palles");
  // #########
  const repairedPalletAdds = repairedPalletAdd({ addRepairedPallets });
  const repairedPalletSelects = repairedPalletSelect({ selectRepairedPallets });
  const repairedPalletUpdates = repairedPalletUpdate({ updateRepairedPallets });
  const repairedPalletDeletes = repairedPalletDelete({ deleteRepairedPallets });
  // #########
  const services = Object.freeze({
    repairedPalletAdds,
    repairedPalletSelects,
    repairedPalletUpdates,
    repairedPalletDeletes,
  });
  
  module.exports = services;
  module.exports = {
    repairedPalletAdds,
    repairedPalletSelects,
    repairedPalletUpdates,
    repairedPalletDeletes,
  };