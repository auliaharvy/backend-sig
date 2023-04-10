const {
  addPermissions,
  selectPermissions,
  updatePermissions,
  deletePermissions,
} = require("../../use-cases/permissions/app");
// #########
const permissionAdd = require("./insert-permission");
const permissionsSelect = require("./select-permission");
const permissionsUpdate = require("./update-permission");
const permissionsDelete = require("./delete-permission");
// #########
const permissionAdds = permissionAdd({
  addPermissions
});
const permissionsSelects = permissionsSelect({
  selectPermissions
});

const permissionsUpdates = permissionsUpdate({
  updatePermissions
});
const permissionsDeletes = permissionsDelete({
  deletePermissions
});
// #########
const services = Object.freeze({
  permissionAdds,
  permissionsSelects,
  permissionsUpdates,
  permissionsDeletes,
});

module.exports = services;
module.exports = {
  permissionAdds,
  permissionsSelects,
  permissionsUpdates,
  permissionsDeletes,
};