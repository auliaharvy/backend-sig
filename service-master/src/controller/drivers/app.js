const {
  addDrivers,
  selectDrivers,
  updateDrivers,
  deleteDrivers,
} = require("../../use-cases/drivers/app");
// #########
const driverAdd = require("./insert-driver");
const driverSelect = require("./select-driver");
const driversUpdate = require("./update-driver");
const driverDelete = require("./delete-driver");
// #########
const driverAdds = driverAdd({
  addDrivers
});
const driversSelects = driverSelect({
  selectDrivers
});

const driversUpdates = driversUpdate({
  updateDrivers
});
const driversDeletes = driverDelete({
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