const {
  makeRoleByUserIds,
} = require("../../entities/user-has-role/app"); // entity
const userHasRoleDB = require("../../data-access/user-has-role/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addRoleByUserId = require("./insert-user-has-role");
const selectRoleByUserId = require("./select-user-has-role");
// const editRole = require("./update-roles");
const deleteRoleByUserId = require("./delete-user-has-role");
// #########
const addsRoleByUserId = addRoleByUserId({
  makeRoleByUserIds,
  userHasRoleDB,
  bcrypt
});

const selectsRoleByUserId = selectRoleByUserId({
  userHasRoleDB
});
// const updateRoles = editRole({
//   rolesDB,
//   patchRoles
// });
const deletesRoleByUserId = deleteRoleByUserId({
  makeRoleByUserIds,
  userHasRoleDB
});
// #########
const services = Object.freeze({
  addsRoleByUserId,
  selectsRoleByUserId,
  deletesRoleByUserId,
});

module.exports = services;
module.exports = {
  addsRoleByUserId,
  selectsRoleByUserId,
  deletesRoleByUserId,
};