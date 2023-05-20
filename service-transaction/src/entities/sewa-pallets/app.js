// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeSewaPallet = require("./make-sewa-pallets");
const patchSewaPalet = require("./patch-sewa-pallets");
// ########
const makeSewaPallets = makeSewaPallet({  });
const patchSewaPallets = patchSewaPalet({  });
// ########
const services = Object.freeze({ makeSewaPallets, patchSewaPallets });

module.exports = services;
module.exports = { makeSewaPallets, patchSewaPallets };