// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeCompanyType = require("./make-company-types");
const patchCompanyType = require("./patch-company-types");
// ########
const makeCompanyTypes = makeCompanyType({});
const patchCompanyTypes = patchCompanyType({});
// ########
const services = Object.freeze({
    makeCompanyTypes,
    patchCompanyTypes,

});

module.exports = services;
module.exports = {
    makeCompanyTypes,
    patchCompanyTypes,
};