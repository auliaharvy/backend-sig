// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makePalletRealization = require("./make-pallet-realizations");
const patchPalletRealization = require("./patch-pallet-realizations");
// ########
const makePalletRealizations = makePalletRealization({  });
const patchPalletRealizations = patchPalletRealization({  });
// ########
const services = Object.freeze({ makePalletRealizations, patchPalletRealizations });

module.exports = services;
module.exports = { makePalletRealizations, patchPalletRealizations };