// const { encrypt, decrypt } = require("../../functions/app");
// ########
const validator = require('validator');
const makeRole = require("./make-roles");
const makeRolePermission = require("./make-roles-permissions");
const patchRole = require("./patch-roles");
// ########
const makeRoles = makeRole({validator});
const makeRolesPermissions = makeRolePermission({});
const patchRoles = patchRole({validator});
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