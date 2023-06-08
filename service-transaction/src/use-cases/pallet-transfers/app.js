const { makePalletTransfers, patchPalletTransfers } = require("../../entities/pallet-transfers/app"); // entity
const palletTransfersDb = require("../../data-access/pallet-transfers/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const PALLET_TRANSFER_TEMPLATE = require("../../lib/mail-template/pallet-transfer-send");
const addPalletTransfer = require("./insert-pallet-transfer");
const selectPalletTransfer = require("./select-pallet-transfer");
const updatePalletTransfer = require("./update-pallet-transfer");
const deletePalletTransfer = require("./delete-pallet-transfer");
// #########
const addPalletTransfers = addPalletTransfer({ makePalletTransfers, palletTransfersDb, trxNumbersDb, SENDMAIL, PALLET_TRANSFER_TEMPLATE });
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
