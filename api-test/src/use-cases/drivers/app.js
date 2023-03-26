const {
    makeDrivers,
    patchDrivers,
} = require("../../entities/drivers/app"); // entity
const driversDb = require("../../data-access/drivers/app"); // database queries
const {
    encrypt,
    decrypt
} = require("../../functions/app");
// #########
const addDriver = require("./insert-driver");
const selectDriver = require("./select-driver");
const updateDriver = require("./update-driver");
const deleteDriver = require("./delete-driver");
// #########
const addDrivers = addDriver({
    makeDrivers,
    driversDb
});
const selectDrivers = selectDriver({
    driversDb,
    decrypt
});
const updateDrivers = updateDriver({
    driversDb,
    patchDrivers
});
const deleteDrivers = deleteDriver({
    driversDb
});
// #########
const services = Object.freeze({
    addDrivers,
    selectDrivers,
    updateDrivers,
    deleteDrivers,
});

module.exports = services;
module.exports = {
    addDrivers,
    selectDrivers,
    updateDrivers,
    deleteDrivers,
};