// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makePermission = require("./make-permissions");
const patchPermission = require("./patch-permissions");
// ########
const makePermissions = makePermission({});
const patchPermissions = patchPermission({});
// ########
const services = Object.freeze({
    makePermissions,
    patchPermissions,

});

module.exports = services;
module.exports = {
    makePermissions,
    patchPermissions,
};