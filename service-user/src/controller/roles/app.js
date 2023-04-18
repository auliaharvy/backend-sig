const {
  addRoles,
  selectRoles,
  updateRoles,
  deleteRoles,
  addRolePermissionsUseCase,
} = require("../../use-cases/roles/app");
// #########
const roleAddPermission = require("./insert-role-permission");
const roleAdd = require("./insert-role");
const rolesSelect = require("./select-role");
const rolesUpdate = require("./update-role");
const rolesDelete = require("./delete-role");
// #########
const roleAdds = roleAdd({
  addRoles
});

const roleAddPermissionController = roleAddPermission({
  addRolePermissionsUseCase
});

const rolesSelects = rolesSelect({
  selectRoles
});

const rolesUpdates = rolesUpdate({
  updateRoles
});
const rolesDeletes = rolesDelete({
  deleteRoles
});
// #########
const services = Object.freeze({
  roleAdds,
  rolesSelects,
  rolesUpdates,
  rolesDeletes,
  roleAddPermissionController,
});

module.exports = services;
module.exports = {
  roleAdds,
  rolesSelects,
  rolesUpdates,
  rolesDeletes,
  roleAddPermissionController,
};