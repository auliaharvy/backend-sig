const { makeRepairedPallets, patchRepairedPallets } = require("../../entities/repaired-pallets/app"); // entity
const repairedPalletDb = require("../../data-access/repaired-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addRepairedPallet = require("./insert-repaired-pallets");
const selectRepairedPallet = require("./select-repaired-pallets");
const updateRepairedPallet = require("./update-repaired-pallets");
const deleteRepairedPallet = require("./delete-repaired-pallets");
// #########
const addRepairedPallets = addRepairedPallet({ makeRepairedPallets, allTransactionDb, repairedPalletDb, trxNumbersDb });
const selectRepairedPallets = selectRepairedPallet({ repairedPalletDb });
const updateRepairedPallets = updateRepairedPallet({ repairedPalletDb, patchRepairedPallets });
const deleteRepairedPallets = deleteRepairedPallet({ repairedPalletDb });
// #########
const services = Object.freeze({
  addRepairedPallets,
  selectRepairedPallets,
  updateRepairedPallets,
  deleteRepairedPallets,
});

module.exports = services;
module.exports = {
  addRepairedPallets,
  selectRepairedPallets,
  updateRepairedPallets,
  deleteRepairedPallets,
};
