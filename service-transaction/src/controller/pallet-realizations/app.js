const {
  addPalletRealizations,
  selectPalletRealizations,
  updatePalletRealizations,
  deletePalletRealizations,
  } = require("../../use-cases/pallet-realizations/app");
  // #########
  const palletRealizationAdd = require("./insert-pallet-realization");
  const palletRealizationSelect = require("./select-pallet-realization");
  const palletRealizationUpdate = require("./update-pallet-realization");
  const palletRealizationDelete = require("./delete-pallet-realization");
  // #########
  const palletRealizationAdds = palletRealizationAdd({ addPalletRealizations });
  const palletRealizationSelects = palletRealizationSelect({ selectPalletRealizations });
  const palletRealizationUpdates = palletRealizationUpdate({ updatePalletRealizations });
  const palletRealizationDeletes = palletRealizationDelete({ deletePalletRealizations });
  // #########
  const services = Object.freeze({
    palletRealizationAdds,
    palletRealizationSelects,
    palletRealizationUpdates,
    palletRealizationDeletes,
  });
  
  module.exports = services;
  module.exports = {
    palletRealizationAdds,
    palletRealizationSelects,
    palletRealizationUpdates,
    palletRealizationDeletes,
  };