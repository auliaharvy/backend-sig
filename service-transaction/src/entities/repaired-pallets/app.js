// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeRepairedPallet = require("./make-repaired-pallets");
const patchRepairedPalet = require("./patch-repaired-pallets");
// ########
const makeRepairedPallets = makeRepairedPallet({  });
const patchRepairedPallets = patchRepairedPalet({  });
// ########
const services = Object.freeze({ makeRepairedPallets, patchRepairedPallets });

module.exports = services;
module.exports = { makeRepairedPallets, patchRepairedPallets };