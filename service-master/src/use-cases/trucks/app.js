const {
  makeTrucks,
  patchTrucks,
} = require("../../entities/trucks/app"); // entity
const trucksDb = require("../../data-access/trucks/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
const bcrypt = require("bcrypt");

// #########
const addTruck = require("./insert-trucks");
const selectTruck = require("./select-trucks");
const editTruck = require("./update-trucks");
const deleteTruck = require("./delete-trucks");

// #########
const addTrucks = addTruck({
  makeTrucks,
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
  selectTrucks,
  updateTrucks,
  deleteTrucks,
});

module.exports = services;
module.exports = {
  addTrucks,
  selectTrucks,
  updateTrucks,
  deleteTrucks,
};
