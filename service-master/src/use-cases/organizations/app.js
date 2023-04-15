const {
  makeOrganizations,
  patchOrganizations
} = require("../../entities/organizations/app"); // entity
const organizationsDB = require("../../data-access/organizations/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addOrganization = require("./insert-organizations");
const selectOrganization = require("./select-organizations");
const editOrganization = require("./update-organizations");
const deleteOrganization = require("./delete-organizations");
// #########
const addOrganizations = addOrganization({
  makeOrganizations,
  organizationsDB,
  bcrypt
});

const selectOrganizations = selectOrganization({
  organizationsDB
});
const updateOrganizations = editOrganization({
  organizationsDB,
  patchOrganizations
});
const deleteOrganizations = deleteOrganization({
  organizationsDB
});
// #########
const services = Object.freeze({
  addOrganizations,
  selectOrganizations,
  updateOrganizations,
  deleteOrganizations,
});

module.exports = services;
module.exports = {
  addOrganizations,
  selectOrganizations,
  updateOrganizations,
  deleteOrganizations,
};