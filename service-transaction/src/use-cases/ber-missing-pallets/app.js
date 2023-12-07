const { makeBerMissingPallets, patchBerMissingPalets } = require("../../entities/ber-missing-pallets/app"); // entity
const berMissingPalletDb = require("../../data-access/ber-missing-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addBerMissingPallet = require("./insert-ber-missing-pallets");
const selectBerMissingPallet = require("./select-ber-missing-pallets");
const updateBerMissingPallet = require("./update-ber-missing-pallets");
const deleteBerMissingPallet = require("./delete-ber-missing-pallets");
// #########
const addBerMissingPallets = addBerMissingPallet({ makeBerMissingPallets, berMissingPalletDb, allTransactionDb, trxNumbersDb });
const selectBerMissingPallets = selectBerMissingPallet({ berMissingPalletDb });
const updateBerMissingPallets = updateBerMissingPallet({ berMissingPalletDb, patchBerMissingPalets });
const deleteBerMissingPallets = deleteBerMissingPallet({ berMissingPalletDb });
// #########
const services = Object.freeze({
  addBerMissingPallets,
  selectBerMissingPallets,
  updateBerMissingPallets,
  deleteBerMissingPallets,
});

module.exports = services;
module.exports = {
  addBerMissingPallets,
  selectBerMissingPallets,
  updateBerMissingPallets,
  deleteBerMissingPallets
};
