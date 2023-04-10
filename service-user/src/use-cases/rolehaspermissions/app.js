const {
    makeRoleHasPermissions,
    patchRoleHasPermissions
} = require("../../entities/rolehaspermissions/app"); // entity
const roleHasPermissionsDB = require("../../data-access/rolehaspermissions/app"); // database queries

const bcrypt = require('bcrypt');
// #########
const addRoleHasPermission = require("./insert-rolehaspermissions");
const selectRoleHasPermission = require("./select-rolehaspermissions");
const updateRoleHasPermission = require("./update-rolehaspermissions");
const deleteRoleHasPermissions = require("./delete-rolehaspermissions");
// #########
const addRoleHasPermissions = addRoleHasPermission({
    makeRoleHasPermissions,
    rolehaspermissionsDB,
    bcrypt
});

const selectRoleHasPermissions = selectRoleHasPermission({
    rolehaspermissionsDB
});
const updateRoleHasPermissions = updateRoleHasPermission({
    rolehaspermissionsDB,
    patchRoleHasPermissions
});
const deleteRoleHasPermissions = deleteRoleHasPermissions({
    rolehaspermissionsDB
});
// #########
const services = Object.freeze({
    addRoleHasPermissions,
    selectRoleHasPermissions,
    updateRoleHasPermissions,
    deleteRoleHasPermissions,
});

module.exports = services;
module.exports = {
    addRoleHasPermissions,
    selectRoleHasPermissions,
    updateRoleHasPermissions,
    deleteRoleHasPermissions,
};