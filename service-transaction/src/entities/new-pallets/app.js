// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeNewPallet = require("./make-new-pallets");
const patchNewPallet = require("./patch-new-pallets");
// ########
const makeNewPallets = makeNewPallet({  });
const patchNewPallets = patchNewPallet({  });
// ########
const services = Object.freeze({ makeNewPallets, patchNewPallets });

module.exports = services;
module.exports = { makeNewPallets, patchNewPallets };