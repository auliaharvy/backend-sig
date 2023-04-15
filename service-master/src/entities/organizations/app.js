// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeOrganization = require("./make-organizations");
const patchOrganization = require("./patch-organizations");
// ########
const makeOrganizations = makeOrganization({});
const patchOrganizations = patchOrganization({});
// ########
const services = Object.freeze({
    makeOrganizations,
    patchOrganizations,

});

module.exports = services;
module.exports = {
    makeOrganizations,
    patchOrganizations,
};