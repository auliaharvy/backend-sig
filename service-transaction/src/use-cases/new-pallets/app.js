const { makeNewPallets, patchNewPallets } = require("../../entities/new-pallets/app"); // entity
const newPalletDb = require("../../data-access/new-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addNewPallet = require("./insert-new-pallets");
const selectNewPallet = require("./select-new-pallets");
const updateNewPallet = require("./update-new-pallets");
const deleteNewPallet = require("./delete-new-pallets");
// #########
const addNewPallets = addNewPallet({ makeNewPallets, newPalletDb, trxNumbersDb });
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
