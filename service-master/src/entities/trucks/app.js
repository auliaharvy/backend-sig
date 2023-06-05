// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeTruck = require("./make-trucks");
const bulkTruck = require("./bulk-trucks");
const patchTruck = require("./patch-trucks");
// ########
const makeTrucks = makeTruck({});
const bulkTrucks = bulkTruck({});
const patchTrucks = patchTruck({});
// ########
const services = Object.freeze({
    makeTrucks,
    bulkTrucks,
    patchTrucks,

});

module.exports = services;
module.exports = {
    makeTrucks,
    bulkTrucks,
    patchTrucks,
};