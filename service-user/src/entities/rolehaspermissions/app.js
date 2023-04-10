// ########
const makeRoleHasPermission = require("./make-rolehaspermissions");
const patchRoleHasPermission = require("./patch-rolehaspermissionss");
// ########
const makeRoleHasPermissions = makeRoleHasPermission({});
const patchRoleHasPermissions = patchRoleHasPermission({});
// ########
const services = Object.freeze({
    makeRoleHasPermissions,
    patchRoleHasPermissions,

});

module.exports = services;
module.exports = {
    makeRoleHasPermissions,
    patchRoleHasPermissions,
};