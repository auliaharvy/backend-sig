const {
  makePermissions,
  patchPermissions
} = require("../../entities/permissions/app"); // entity
const permissionsDB = require("../../data-access/permissions/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addPermission = require("./insert-permissions");
const selectPermission = require("./select-permissions");
const updatePermission = require("./update-permissions");
const deletePermissions = require("./delete-permissions");
// #########
const addPermissions = addPermission({
  makePermissions,
  permissionsDB,
  bcrypt
});

const selectPermissions = selectPermission({
  permissionsDB
});
const updatePermissions = updatePermission({
  permissionsDB,
  patchPermissions
});
const deletePermissionss = deletePermissions({
  permissionsDB
});
// #########
const services = Object.freeze({
  addPermissions,
  selectPermissions,
  updatePermissions,
  deletePermissions,
});

module.exports = services;
module.exports = {
  addPermissions,
  selectPermissions,
  updatePermissions,
  deletePermissions,
};