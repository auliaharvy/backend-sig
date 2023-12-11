const {
  addDistributors,
  selectDistributors,
  updateDistributors,
  deleteDistributors,
} = require("../../use-cases/distributors/app");
// #########
const distributorAdd = require("./insert-distributors");
const distributorsSelect = require("./select-distributors");
const distributorsUpdate = require("./update-distributors");
const distributorsDelete = require("./delete-distributors");
// #########
const distributorAdds = distributorAdd({
  addDistributors
});
const distributorsSelects = distributorsSelect({
  selectDistributors
});

const distributorsUpdates = distributorsUpdate({
  updateDistributors
});
const distributorsDeletes = distributorsDelete({
  deleteDistributors
});
// #########
const services = Object.freeze({
  distributorAdds,
  distributorsSelects,
  distributorsUpdates,
  distributorsDeletes,
});

module.exports = services;
module.exports = {
  distributorAdds,
  distributorsSelects,
  distributorsUpdates,
  distributorsDeletes,
};