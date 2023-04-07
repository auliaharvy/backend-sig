// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeRole = require("./make-roles");
const patchRole = require("./patch-roles");
// ########
const makeRoles = makeRole({});
const patchRoles = patchRole({});
// ########
const services = Object.freeze({
    makeRoles,
    patchRoles,

});

module.exports = services;
module.exports = {
    makeRoles,
    patchRoles,
};