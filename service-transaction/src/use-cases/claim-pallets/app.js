const { makeClaimPallets, patchClaimPallets } = require("../../entities/claim-pallets/app"); // entity
const claimPalletDb = require("../../data-access/claim-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addClaimPallet = require("./insert-claim-pallets");
const selectClaimPallet = require("./select-claim-pallets");
const updateClaimPallet = require("./update-claim-pallets");
const deleteClaimPallet = require("./delete-claim-pallets");
// #########
const addClaimPallets = addClaimPallet({ makeClaimPallets, claimPalletDb, trxNumbersDb });
const selectClaimPallets = selectClaimPallet({ claimPalletDb });
const updateClaimPallets = updateClaimPallet({ claimPalletDb, patchClaimPallets });
const deleteClaimPallets = deleteClaimPallet({ claimPalletDb });
// #########
const services = Object.freeze({
  addClaimPallets,
  selectClaimPallets,
  updateClaimPallets,
  deleteClaimPallets,
});

module.exports = services;
module.exports = {
  addClaimPallets,
  selectClaimPallets,
  updateClaimPallets,
  deleteClaimPallets,
};
