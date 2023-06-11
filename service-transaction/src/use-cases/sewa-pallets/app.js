const { makeSewaPallets, patchSewaPallets } = require("../../entities/sewa-pallets/app"); // entity
const sewaPalletDb = require("../../data-access/sewa-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const SEWA_PALLET_ADD_TEMPLATE = require("../../lib/mail-template/sewa-pallet-add");
const SEWA_PALLET_APPROVAL_TEMPLATE = require("../../lib/mail-template/sewa-pallet-approval");
const addSewaPallet = require("./insert-sewa-pallets");
const selectSewaPallet = require("./select-sewa-pallets");
const updateSewaPallet = require("./update-sewa-pallets");
const deleteSewaPallet = require("../sewa-pallets/delete-sewa-pallets");
// #########
const addSewaPallets = addSewaPallet({ makeSewaPallets, sewaPalletDb, allTransactionDb, trxNumbersDb, SENDMAIL, SEWA_PALLET_ADD_TEMPLATE });
const selectSewaPallets = selectSewaPallet({ sewaPalletDb });
const updateSewaPallets = updateSewaPallet({ sewaPalletDb, allTransactionDb, trxNumbersDb, patchSewaPallets, SENDMAIL, SEWA_PALLET_APPROVAL_TEMPLATE });
const deleteSewaPallets = deleteSewaPallet({ sewaPalletDb });
// #########
const services = Object.freeze({
  addSewaPallets,
  selectSewaPallets,
  updateSewaPallets,
  deleteSewaPallets,
});

module.exports = services;
module.exports = {
  addSewaPallets,
  selectSewaPallets,
  updateSewaPallets,
  deleteSewaPallets,
};
