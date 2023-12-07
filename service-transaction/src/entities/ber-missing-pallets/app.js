// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeBerMissingPallet = require("./make-ber-missing-pallets");
const patchBerMissingPalet = require("./patch-ber-missing-pallets");
// ########
const makeBerMissingPallets = makeBerMissingPallet({  });
const patchBerMissingPalets = patchBerMissingPalet({  });
// ########
const services = Object.freeze({ makeBerMissingPallets, patchBerMissingPalets });

module.exports = services;
module.exports = { makeBerMissingPallets, patchBerMissingPalets };