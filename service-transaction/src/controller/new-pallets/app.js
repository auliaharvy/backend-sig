const {
  addNewPallets,
  selectNewPallets,
  updateNewPallets,
  deleteNewPallets,
  } = require("../../use-cases/new-pallets/app");
  // #########
  const newPalletAdd = require("./insert-new-pallet");
  const newPalletSelect = require("./select-new-pallet");
  const newPalletUpdate = require("./update-new-pallet");
  const newPalletDelete = require("./delete-new-pallet");
  // #########
  const newPalletAdds = newPalletAdd({ addNewPallets });
  const newPalletSelects = newPalletSelect({ selectNewPallets });
  const newPalletUpdates = newPalletUpdate({ updateNewPallets });
  const newPalletDeletes = newPalletDelete({ deleteNewPallets });
  // #########
  const services = Object.freeze({
    newPalletAdds,
    newPalletSelects,
    newPalletUpdates,
    newPalletDeletes,
  });
  
  module.exports = services;
  module.exports = {
    newPalletAdds,
    newPalletSelects,
    newPalletUpdates,
    newPalletDeletes,
  };