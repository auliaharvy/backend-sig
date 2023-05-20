const {
  addSewaPallets,
  selectSewaPallets,
  updateSewaPallets,
  deleteSewaPallets,
  } = require("../../use-cases/sewa-pallets/app");
  // #########
  const sewaPalletAdd = require("./insert-sewa-pallet");
  const sewaPalletSelect = require("./select-sewa-pallet");
  const sewaPalletUpdate = require("./update-sewa-pallet");
  const sewaPalletDelete = require("./delete-sewa-palles");
  // #########
  const sewaPalletAdds = sewaPalletAdd({ addSewaPallets });
  const sewaPalletSelects = sewaPalletSelect({ selectSewaPallets });
  const sewaPalletUpdates = sewaPalletUpdate({ updateSewaPallets });
  const sewaPalletDeletes = sewaPalletDelete({ deleteSewaPallets });
  // #########
  const services = Object.freeze({
    sewaPalletAdds,
    sewaPalletSelects,
    sewaPalletUpdates,
    sewaPalletDeletes,
  });
  
  module.exports = services;
  module.exports = {
    sewaPalletAdds,
    sewaPalletSelects,
    sewaPalletUpdates,
    sewaPalletDeletes,
  };