const {
  makeTrucks,
  bulkTrucks,
  patchTrucks,
} = require("../../entities/trucks/app"); // entity
const trucksDb = require("../../data-access/trucks/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
const bcrypt = require("bcrypt");

// #########
const addTruck = require("./insert-trucks");
const bulkAddTruck = require("./bulk-insert-truck");
const selectTruck = require("./select-trucks");
const editTruck = require("./update-trucks");
const deleteTruck = require("./delete-trucks");

// #########
const addTrucks = addTruck({
  makeTrucks,
  trucksDb,
  bcrypt,
});

const bulkAddTrucks = bulkAddTruck({
  bulkTrucks,
  trucksDb,
  bcrypt,
});

const selectTrucks = selectTruck({
  trucksDb,
});
const updateTrucks = editTruck({
  trucksDb,
  patchTrucks,
});
const deleteTrucks = deleteTruck({
  trucksDb,
});
// #########
const services = Object.freeze({
  addTrucks,
  bulkAddTrucks,
  selectTrucks,
  updateTrucks,
  deleteTrucks,
});

module.exports = services;
module.exports = {
  addTrucks,
  bulkAddTrucks,
  selectTrucks,
  updateTrucks,
  deleteTrucks,
};
