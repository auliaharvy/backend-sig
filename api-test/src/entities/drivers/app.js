const {
    encrypt,
    decrypt
} = require("../../functions/app");
// ########
const makeDriver = require("./make-drivers");
const patchDriver = require("./patch-drivers");
// ########
const makeDrivers = makeDriver({
    encrypt
});
const patchDrivers = patchDriver({
    encrypt
});
// ########
const services = Object.freeze({
    makeDrivers,
    patchDrivers
});

module.exports = services;
module.exports = {
    makeDrivers,
    patchDrivers
};