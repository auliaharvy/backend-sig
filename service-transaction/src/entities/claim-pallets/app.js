// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeClaimPallet = require("./make-claim-pallets");
const patchClaimPalet = require("./patch-claim-pallets");
// ########
const makeClaimPallets = makeClaimPallet({  });
const patchClaimPallets = patchClaimPalet({  });
// ########
const services = Object.freeze({ makeClaimPallets, patchClaimPallets });

module.exports = services;
module.exports = { makeClaimPallets, patchClaimPallets };