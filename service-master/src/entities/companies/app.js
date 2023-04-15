// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeCompany = require("./make-companies");
const patchCompany = require("./patch-companies");
// ########
const makeCompanies = makeCompany({});
const patchCompanies = patchCompany({});
// ########
const services = Object.freeze({
    makeCompanies,
    patchCompanies,

});

module.exports = services;
module.exports = {
    makeCompanies,
    patchCompanies,
};