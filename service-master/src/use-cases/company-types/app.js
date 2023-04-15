const {
  makeCompanyTypes,
  patchCompanyTypes
} = require("../../entities/company-types/app"); // entity
const companyTypesDB = require("../../data-access/company-types/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addCompanyType = require("./insert-company-types");
const selectCompanyType = require("./select-company-types");
const editCompanyType = require("./update-company-types");
const deleteCompanyType = require("./delete-company-types");
// #########
const addCompanyTypes = addCompanyType({
  makeCompanyTypes,
  companyTypesDB,
  bcrypt
});

const selectCompanyTypes = selectCompanyType({
  companyTypesDB
});
const updateCompanyTypes = editCompanyType({
  companyTypesDB,
  patchCompanyTypes
});
const deleteCompanyTypes = deleteCompanyType({
  companyTypesDB
});
// #########
const services = Object.freeze({
  addCompanyTypes,
  selectCompanyTypes,
  updateCompanyTypes,
  deleteCompanyTypes,
});

module.exports = services;
module.exports = {
  addCompanyTypes,
  selectCompanyTypes,
  updateCompanyTypes,
  deleteCompanyTypes,
};