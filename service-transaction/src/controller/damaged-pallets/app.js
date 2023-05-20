const {
  addDamagedPallets,
  selectDamagedPallets,
  updateDamagedPallets,
  deleteDamagedPallets,
  } = require("../../use-cases/damaged-pallets/app");
  // #########
  const damagedPalletAdd = require("./insert-damaged-pallet");
  const damagedPalletSelect = require("./select-damaged-pallet");
  const damagedPalletUpdate = require("./update-damaged-pallet");
  const damagedPalletDelete = require("./delete-damaged-palles");
  // #########
  const damagedPalletAdds = damagedPalletAdd({ addDamagedPallets });
  const damagedPalletSelects = damagedPalletSelect({ selectDamagedPallets });
  const damagedPalletUpdates = damagedPalletUpdate({ updateDamagedPallets });
  const damagedPalletDeletes = damagedPalletDelete({ deleteDamagedPallets });
  // #########
  const services = Object.freeze({
    damagedPalletAdds,
    damagedPalletSelects,
    damagedPalletUpdates,
    damagedPalletDeletes,
  });
  
  module.exports = services;
  module.exports = {
    damagedPalletAdds,
    damagedPalletSelects,
    damagedPalletUpdates,
    damagedPalletDeletes,
  };