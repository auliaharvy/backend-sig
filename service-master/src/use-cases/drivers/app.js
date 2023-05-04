const {
  makeDrivers,
  patchDrivers,
} = require("../../entities/drivers/app"); // entity
const driversDb = require("../../data-access/drivers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
const bcrypt = require("bcrypt");

// #########
const addDriver = require("./insert-drivers");
const selectDriver = require("./select-drivers");
const editDriver = require("./update-drivers");
const deleteDriver = require("./delete-drivers");

// #########
const addDrivers = addDriver({
  makeDrivers,
  driversDb,
  bcrypt,
});

const selectDrivers = selectDriver({
  driversDb,
});
const updateDrivers = editDriver({
  driversDb,
  patchDrivers,
});
const deleteDrivers = deleteDriver({
  driversDb,
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
