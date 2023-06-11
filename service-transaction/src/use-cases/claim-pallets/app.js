const { makeClaimPallets, patchClaimPallets } = require("../../entities/claim-pallets/app"); // entity
const claimPalletDb = require("../../data-access/claim-pallets/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const CLAIM_PALLET_ADD_TEMPLATE = require("../../lib/mail-template/claim-pallet-add");
const CLAIM_PALLET_APPROVAL_MANAGER_TEMPLATE = require("../../lib/mail-template/claim-pallet-manager");
const addClaimPallet = require("./insert-claim-pallets");
const selectClaimPallet = require("./select-claim-pallets");
const updateClaimPallet = require("./update-claim-pallets");
const deleteClaimPallet = require("./delete-claim-pallets");
// #########
const addClaimPallets = addClaimPallet({ makeClaimPallets, claimPalletDb, allTransactionDb ,trxNumbersDb, SENDMAIL, CLAIM_PALLET_ADD_TEMPLATE });
const selectClaimPallets = selectClaimPallet({ claimPalletDb });
const updateClaimPallets = updateClaimPallet({ claimPalletDb, trxNumbersDb, allTransactionDb, patchClaimPallets, SENDMAIL, CLAIM_PALLET_APPROVAL_MANAGER_TEMPLATE});
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
