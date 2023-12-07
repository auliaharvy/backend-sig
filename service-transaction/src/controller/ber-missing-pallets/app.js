const {
  addBerMissingPallets,
  selectBerMissingPallets,
  updateBerMissingPallets,
  deleteBerMissingPallets,
  } = require("../../use-cases/ber-missing-pallets/app");
  // #########
  const berMissingPalletAdd = require("./insert-ber-missing-pallet");
  const berMissingPalletSelect = require("./select-ber-missing-pallet");
  const berMissingPalletUpdate = require("./update-ber-missing-pallet");
  const berMissingPalletDelete = require("./delete-ber-missing-palles");
  // #########
  const berMissingPalletAdds = berMissingPalletAdd({ addBerMissingPallets });
  const berMissingPalletSelects = berMissingPalletSelect({ selectBerMissingPallets });
  const berMissingPalletUpdates = berMissingPalletUpdate({ updateBerMissingPallets });
  const berMissingPalletDeletes = berMissingPalletDelete({ deleteBerMissingPallets });
  // #########
  const services = Object.freeze({
    berMissingPalletAdds,
    berMissingPalletSelects,
    berMissingPalletUpdates,
    berMissingPalletDeletes,
  });
  
  module.exports = services;
  module.exports = {
    berMissingPalletAdds,
    berMissingPalletSelects,
    berMissingPalletUpdates,
    berMissingPalletDeletes,
  };