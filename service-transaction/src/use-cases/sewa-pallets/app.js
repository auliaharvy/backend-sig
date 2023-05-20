const { makeSewaPallets, patchSewaPallets } = require("../../entities/sewa-pallets/app"); // entity
const sewaPalletDb = require("../../data-access/sewa-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addSewaPallet = require("./insert-sewa-pallets");
const selectSewaPallet = require("./select-sewa-pallets");
const updateSewaPallet = require("./update-sewa-pallets");
const deleteSewaPallet = require("../sewa-pallets/delete-sewa-pallets");
// #########
const addSewaPallets = addSewaPallet({ makeSewaPallets, sewaPalletDb, trxNumbersDb });
const selectSewaPallets = selectSewaPallet({ sewaPalletDb });
const updateSewaPallets = updateSewaPallet({ sewaPalletDb, patchSewaPallets });
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
