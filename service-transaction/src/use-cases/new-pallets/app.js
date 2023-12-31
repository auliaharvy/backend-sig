const { makeNewPallets, patchNewPallets } = require("../../entities/new-pallets/app"); // entity
const newPalletDb = require("../../data-access/new-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const NEW_PALLET_TEMPLATE = require("../../lib/mail-template/new-pallet-add");
const addNewPallet = require("./insert-new-pallets");
const selectNewPallet = require("./select-new-pallets");
const updateNewPallet = require("./update-new-pallets");
const deleteNewPallet = require("./delete-new-pallets");
// #########
const addNewPallets = addNewPallet({ makeNewPallets, newPalletDb, allTransactionDb, trxNumbersDb, SENDMAIL, NEW_PALLET_TEMPLATE });
const selectNewPallets = selectNewPallet({ newPalletDb });
const updateNewPallets = updateNewPallet({ newPalletDb, patchNewPallets });
const deleteNewPallets = deleteNewPallet({ newPalletDb });
// #########
const services = Object.freeze({
  addNewPallets,
  selectNewPallets,
  updateNewPallets,
  deleteNewPallets,
});

module.exports = services;
module.exports = {
  addNewPallets,
  selectNewPallets,
  updateNewPallets,
  deleteNewPallets,
};
