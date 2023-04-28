const {
  makePallets,
  patchPallets
} = require("../../entities/pallets/app"); // entity
const palletsDB = require("../../data-access/pallets/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addPallet = require("./insert-pallets");
const selectPallet = require("./select-pallets");
const editPallet = require("./update-pallets");
const deletePallet = require("./delete-pallets");
// #########
const addPallets = addPallet({
  makePallets,
  palletsDB,
  bcrypt
});

const selectPallets = selectPallet({
  palletsDB
});
const updatePallets = editPallet({
  palletsDB,
  patchPallets
});
const deletePallets = deletePallet({
  palletsDB
});
// #########
const services = Object.freeze({
  addPallets,
  selectPallets,
  updatePallets,
  deletePallets,
});

module.exports = services;
module.exports = {
  addPallets,
  selectPallets,
  updatePallets,
  deletePallets,
};