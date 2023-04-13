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
const editRole = require("./update-roles");
const deleteRole = require("./delete-roles");
// #########
const addRoles = addRole({
  makeRoles,
  rolesDB,
  bcrypt
});

const selectRoles = selectRole({
  rolesDB
});
const updateRoles = editRole({
  rolesDB,
  patchRoles
});
const deleteRoles = deleteRole({
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