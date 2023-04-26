const {
  makePermissionByRoleIds,
} = require("../../entities/role-has-permission/app"); // entity
const roleHasPermissionDB = require("../../data-access/role-has-permission/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addPermissionByRoleId = require("./insert-role-has-permission");
const selectPermissionByRoleId = require("./select-role-has-permission");
// const editRole = require("./update-roles");
const deletePermissionByRoleId = require("./delete-role-has-permission");
// #########
const addsPermissionByRoleId = addPermissionByRoleId({
  makePermissionByRoleIds,
  roleHasPermissionDB,
  bcrypt
});

const selectsPermissionByRoleId = selectPermissionByRoleId({
  roleHasPermissionDB
});
// const updateRoles = editRole({
//   rolesDB,
//   patchRoles
// });
const deletesPermissionByRoleId = deletePermissionByRoleId({
  roleHasPermissionDB
});
// #########
const services = Object.freeze({
  addsPermissionByRoleId,
  selectsPermissionByRoleId,
  deletesPermissionByRoleId,
});

module.exports = services;
module.exports = {
  addsPermissionByRoleId,
  selectsPermissionByRoleId,
  deletesPermissionByRoleId,
};