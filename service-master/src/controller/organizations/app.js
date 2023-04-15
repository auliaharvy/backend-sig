const {
  addOrganizations,
  selectOrganizations,
  updateOrganizations,
  deleteOrganizations,
} = require("../../use-cases/organizations/app");
// #########
const organizationAdd = require("./insert-organization");
const organizationsSelect = require("./select-organization");
const organizationsUpdate = require("./update-organization");
const organizationsDelete = require("./delete-organization");
// #########
const organizationAdds = organizationAdd({
  addOrganizations
});
const organizationsSelects = organizationsSelect({
  selectOrganizations
});

const organizationsUpdates = organizationsUpdate({
  updateOrganizations
});
const organizationsDeletes = organizationsDelete({
  deleteOrganizations
});
// #########
const services = Object.freeze({
  organizationAdds,
  organizationsSelects,
  organizationsUpdates,
  organizationsDeletes,
});

module.exports = services;
module.exports = {
  organizationAdds,
  organizationsSelects,
  organizationsUpdates,
  organizationsDeletes,
};