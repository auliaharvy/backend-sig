const {
  addsPermissionByRoleId,
  selectsPermissionByRoleId,
  deletesPermissionByRoleId,
} = require("../../use-cases/role-has-permission/app");
// #########
const permissionByRoleIdAdd = require("./insert-role-has-permission");
const permissionByRoleIdSelect = require("./select-role-has-permission");
const permissionByRoleIdDelete = require("./delete-role-has-permission");
// #########
const permissionByRoleIdAdds = permissionByRoleIdAdd({
  addsPermissionByRoleId
});
const permissionByRoleIdSelects = permissionByRoleIdSelect({
  selectsPermissionByRoleId
});

const permissionByRoleIdDeletes = permissionByRoleIdDelete({
  deletesPermissionByRoleId
});
// #########
const services = Object.freeze({
  permissionByRoleIdAdds,
  permissionByRoleIdSelects,
  permissionByRoleIdDeletes,
});

module.exports = services;
module.exports = {
  permissionByRoleIdAdds,
  permissionByRoleIdSelects,
  permissionByRoleIdDeletes,
};