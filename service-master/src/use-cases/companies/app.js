const {
  makeCompanies,
  patchCompanies,
} = require("../../entities/companies/app"); // entity
const companiesDB = require("../../data-access/companies/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
const bcrypt = require("bcrypt");

// #########
const addCompany = require("./insert-companies");
const selectCompany = require("./select-companies");
const editCompany = require("./update-companies");
const deleteCompany = require("./delete-companies");

// #########
const addCompanies = addCompany({
  makeCompanies,
  companiesDB,
  bcrypt,
});

const selectCompanies = selectCompany({
  companiesDB,
});
const updateCompanies = editCompany({
  companiesDB,
  patchCompanies,
});
const deleteCompanies = deleteCompany({
  companiesDB,
});
// #########
const services = Object.freeze({
  addCompanies,
  selectCompanies,
  updateCompanies,
  deleteCompanies,
});

module.exports = services;
module.exports = {
  addCompanies,
  selectCompanies,
  updateCompanies,
  deleteCompanies,
};
