const {
  addCompanies,
  selectCompanies,
  updateCompanies,
  deleteCompanies,
} = require("../../use-cases/companies/app");
// #########
const companyAdd = require("./insert-company");
const companiesSelect = require("./select-company");
const companiesUpdate = require("./update-company");
const companiesDelete = require("./delete-company");
// #########
const companyAdds = companyAdd({
  addCompanies
});
const companiesSelects = companiesSelect({
  selectCompanies
});

const companiesUpdates = companiesUpdate({
  updateCompanies
});
const companiesDeletes = companiesDelete({
  deleteCompanies
});
// #########
const services = Object.freeze({
  companyAdds,
  companiesSelects,
  companiesUpdates,
  companiesDeletes,
});

module.exports = services;
module.exports = {
  companyAdds,
  companiesSelects,
  companiesUpdates,
  companiesDeletes,
};