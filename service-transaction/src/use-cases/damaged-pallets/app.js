const { makeDamagedPallets, patchDamagedPallets } = require("../../entities/damaged-pallets/app"); // entity
const damagedPalletDb = require("../../data-access/damaged-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addDamagedPallet = require("./insert-damaged-pallets");
const selectDamagedPallet = require("./select-damaged-pallets");
const updateDamagedPallet = require("./update-damaged-pallets");
const deleteDamagedPallet = require("./delete-damaged-pallets");
// #########
const addDamagedPallets = addDamagedPallet({ makeDamagedPallets, damagedPalletDb, allTransactionDb, trxNumbersDb });
const selectDamagedPallets = selectDamagedPallet({ damagedPalletDb });
const updateDamagedPallets = updateDamagedPallet({ damagedPalletDb, patchDamagedPallets });
const deleteDamagedPallets = deleteDamagedPallet({ damagedPalletDb });
// #########
const services = Object.freeze({
  addDamagedPallets,
  selectDamagedPallets,
  updateDamagedPallets,
  deleteDamagedPallets,
});

module.exports = services;
module.exports = {
  addDamagedPallets,
  selectDamagedPallets,
  updateDamagedPallets,
  deleteDamagedPallets,
};
