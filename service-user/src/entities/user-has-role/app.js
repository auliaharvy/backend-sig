// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeRoleByUserId = require("./make-user-has-role");
// ########
const makeRoleByUserIds = makeRoleByUserId({});
// ########
const services = Object.freeze({
    makeRoleByUserIds

});

module.exports = services;
module.exports = {
    makeRoleByUserIds

};