const {
  addCompanyTypes,
  selectCompanyTypes,
  updateCompanyTypes,
  deleteCompanyTypes,
} = require("../../use-cases/company-types/app");
// #########
const companyTypeAdd = require("./insert-company-type");
const companyTypesSelect = require("./select-company-type");
const companyTypesUpdate = require("./update-company-type");
const companyTypesDelete = require("./delete-company-type");
// #########
const companyTypeAdds = companyTypeAdd({
  addCompanyTypes
});
const companyTypesSelects = companyTypesSelect({
  selectCompanyTypes
});

const companyTypesUpdates = companyTypesUpdate({
  updateCompanyTypes
});
const companyTypesDeletes = companyTypesDelete({
  deleteCompanyTypes
});
// #########
const services = Object.freeze({
  companyTypeAdds,
  companyTypesSelects,
  companyTypesUpdates,
  companyTypesDeletes,
});

module.exports = services;
module.exports = {
  companyTypeAdds,
  companyTypesSelects,
  companyTypesUpdates,
  companyTypesDeletes,
};