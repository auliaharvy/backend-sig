// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeRole = require("./make-roles");
const makeRolePermission = require("./make-roles-permissions");
const patchRole = require("./patch-roles");
// ########
const makeRoles = makeRole({});
const makeRolesPermissions = makeRolePermission({});
const patchRoles = patchRole({});
// ########
const services = Object.freeze({
    makeRoles,
    patchRoles,
    makeRolesPermissions,

});

module.exports = services;
module.exports = {
    makeRoles,
    patchRoles,
    makeRolesPermissions,
};