const { makePalletRealizations, patchPalletRealizations } = require("../../entities/pallet-realizations/app"); // entity
const palletRealizationDb = require("../../data-access/pallet-realizations/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addPalletRealization = require("./insert-pallet-realizations");
const selectPalletRealization = require("./select-pallet-realizations");
const updatePalletRealization = require("./update-pallet-realizations");
const deletePalletRealization = require("./delete-pallet-realizations");
// #########
const addPalletRealizations = addPalletRealization({ makePalletRealizations, palletRealizationDb, trxNumbersDb });
const selectPalletRealizations = selectPalletRealization({ palletRealizationDb });
const updatePalletRealizations = updatePalletRealization({ palletRealizationDb, patchPalletRealizations });
const deletePalletRealizations = deletePalletRealization({ palletRealizationDb });
// #########
const services = Object.freeze({
  addPalletRealizations,
  selectPalletRealizations,
  updatePalletRealizations,
  deletePalletRealizations,
});

module.exports = services;
module.exports = {
  addPalletRealizations,
  selectPalletRealizations,
  updatePalletRealizations,
  deletePalletRealizations,
};
