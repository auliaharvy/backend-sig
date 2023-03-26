const {
    addDrivers,
    selectDrivers,
    updateDrivers,
    deleteDrivers,
} = require("../../use-cases/drivers/app");
// #########
const driverAdd = require("./insert-driver");
const driversSelect = require("./select-driver");
const driversUpdate = require("./update-driver");
const driversDelete = require("./delete-driver");
// #########
const driverAdds = driverAdd({
    addDrivers
});
const driversSelects = driversSelect({
    selectDrivers
});
const driversUpdates = driversUpdate({
    updateDrivers
});
const driversDeletes = driversDelete({
    deleteDrivers
});
// #########
const services = Object.freeze({
    driverAdds,
    driversSelects,
    driversUpdates,
    driversDeletes,
});

module.exports = services;
module.exports = {
    driverAdds,
    driversSelects,
    driversUpdates,
    driversDeletes,
};