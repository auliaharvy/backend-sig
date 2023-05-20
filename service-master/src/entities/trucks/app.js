// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeTruck = require("./make-trucks");
const patchTruck = require("./patch-trucks");
// ########
const makeTrucks = makeTruck({});
const patchTrucks = patchTruck({});
// ########
const services = Object.freeze({
    makeTrucks,
    patchTrucks,

});

module.exports = services;
module.exports = {
    makeTrucks,
    patchTrucks,
};