const {
  makeRoles,
  patchRoles
} = require("../../entities/roles/app"); // entity
const rolesDB = require("../../data-access/roles/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addRole = require("./insert-roles");
const selectRole = require("./select-roles");
const updateRole = require("./update-roles");
const deleteRoles = require("./delete-roles");
// #########
const addRoles = addRole({
  makeRoles,
  rolesDB,
  bcrypt
});

const selectRoles = selectRole({
  rolesDB
});
const updateRoles = updateRole({
  rolesDB,
  patchRoles
});
const deleteRoless = deleteRoles({
  rolesDB
});
// #########
const services = Object.freeze({
  addRoles,
  selectRoles,
  updateRoles,
  deleteRoles,
});

module.exports = services;
module.exports = {
  addRoles,
  selectRoles,
  updateRoles,
  deleteRoles,
};