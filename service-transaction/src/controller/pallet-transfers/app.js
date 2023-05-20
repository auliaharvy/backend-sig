const {
  addPalletTransfers,
  selectPalletTransfers,
  updatePalletTransfers,
  deletePalletTransfers,
  } = require("../../use-cases/pallet-transfers/app");
  // #########
  const palletTransferAdd = require("./insert-pallet-transfer");
  const palletTransferSelect = require("./select-pallet-transfer");
  const palletTransferUpdate = require("./update-pallet-transfer");
  const palletTransferDelete = require("./delete-pallet-transfer");
  // #########
  const palletTransferAdds = palletTransferAdd({ addPalletTransfers });
  const palletTransferSelects = palletTransferSelect({ selectPalletTransfers });
  const palletTransferUpdates = palletTransferUpdate({ updatePalletTransfers });
  const palletTransferDeletes = palletTransferDelete({ deletePalletTransfers });
  // #########
  const services = Object.freeze({
    palletTransferAdds,
    palletTransferSelects,
    palletTransferUpdates,
    palletTransferDeletes,
  });
  
  module.exports = services;
  module.exports = {
    palletTransferAdds,
    palletTransferSelects,
    palletTransferUpdates,
    palletTransferDeletes,
  };