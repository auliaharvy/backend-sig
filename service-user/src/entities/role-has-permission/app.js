// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makePermissionByRoleId = require("./make-role-has-permission");
// ########
const makePermissionByRoleIds = makePermissionByRoleId({});
// ########
const services = Object.freeze({
    makePermissionByRoleIds

});

module.exports = services;
module.exports = {
    makePermissionByRoleIds

};