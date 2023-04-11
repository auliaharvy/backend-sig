const {
  addRoles,
  selectRoles,
  updateRoles,
  deleteRoles,
} = require("../../use-cases/roles/app");
// #########
const roleAdd = require("./insert-role");
const rolesSelect = require("./select-role");
const rolesUpdate = require("./update-role");
const rolesDelete = require("./delete-role");
// #########
const roleAdds = roleAdd({
  addRoles
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
});

module.exports = services;
module.exports = {
  roleAdds,
  rolesSelects,
  rolesUpdates,
  rolesDeletes,
};