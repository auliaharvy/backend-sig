const {
  makeDistributors,
  patchDistributors
} = require("../../entities/distributors/app"); // entity
const distributorsDB = require("../../data-access/distributors/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const addDistributor = require("./insert-distributors");
const selectDistributor = require("./select-distributors");
const editDistributor = require("./update-distributors");
const deleteDistributor = require("./delete-distributors");
// #########
const addDistributors = addDistributor({
  makeDistributors,
  distributorsDB,
  bcrypt
});

const selectDistributors = selectDistributor({
  distributorsDB
});
const updateDistributors = editDistributor({
  distributorsDB,
  patchDistributors
});
const deleteDistributors = deleteDistributor({
  distributorsDB
});
// #########
const services = Object.freeze({
  addDistributors,
  selectDistributors,
  updateDistributors,
  deleteDistributors,
});

module.exports = services;
module.exports = {
  addDistributors,
  selectDistributors,
  updateDistributors,
  deleteDistributors,
};