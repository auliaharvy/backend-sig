// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makePalletTransfer = require("./make-pallet-transfers");
const patchPalletTransfer = require("./patch-pallet-transfers");
// ########
const makePalletTransfers = makePalletTransfer({  });
const patchPalletTransfers = patchPalletTransfer({  });
// ########
const services = Object.freeze({ makePalletTransfers, patchPalletTransfers });

module.exports = services;
module.exports = { makePalletTransfers, patchPalletTransfers };