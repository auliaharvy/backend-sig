// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makePallet = require("./make-pallets");
const patchPallet = require("./patch-pallets");
// ########
const makePallets = makePallet({});
const patchPallets = patchPallet({});
// ########
const services = Object.freeze({
    makePallets,
    patchPallets,

});

module.exports = services;
module.exports = {
    makePallets,
    patchPallets,
};