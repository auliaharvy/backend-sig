const { makePalletTransfers, patchPalletTransfers } = require("../../entities/pallet-transfers/app"); // entity
const palletTransfersDb = require("../../data-access/pallet-transfers/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addPalletTransfer = require("./insert-pallet-transfer");
const selectPalletTransfer = require("./select-pallet-transfer");
const updatePalletTransfer = require("./update-pallet-transfer");
const deletePalletTransfer = require("./delete-pallet-transfer");
// #########
const addPalletTransfers = addPalletTransfer({ makePalletTransfers, palletTransfersDb, trxNumbersDb });
const selectPalletTransfers = selectPalletTransfer({ palletTransfersDb });
const updatePalletTransfers = updatePalletTransfer({ palletTransfersDb, patchPalletTransfers });
const deletePalletTransfers = deletePalletTransfer({ palletTransfersDb });
// #########
const services = Object.freeze({
  addPalletTransfers,
  selectPalletTransfers,
  updatePalletTransfers,
  deletePalletTransfers,
});

module.exports = services;
module.exports = {
  addPalletTransfers,
  selectPalletTransfers,
  updatePalletTransfers,
  deletePalletTransfers,
};
