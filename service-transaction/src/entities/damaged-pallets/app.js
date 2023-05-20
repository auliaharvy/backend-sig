// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeDamagedPallet = require("./make-damaged-pallets");
const patchDamagedPalet = require("./patch-damaged-pallets");
// ########
const makeDamagedPallets = makeDamagedPallet({  });
const patchDamagedPallets = patchDamagedPalet({  });
// ########
const services = Object.freeze({ makeDamagedPallets, patchDamagedPallets });

module.exports = services;
module.exports = { makeDamagedPallets, patchDamagedPallets };