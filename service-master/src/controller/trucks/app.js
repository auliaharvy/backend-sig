const {
  addTrucks,
  selectTrucks,
  updateTrucks,
  deleteTrucks,
} = require("../../use-cases/trucks/app");
// #########
const truckAdd = require("./insert-truck");
const truckSelect = require("./select-truck");
const trucksUpdate = require("./update-truck");
const truckDelete = require("./delete-truck");
// #########
const truckAdds = truckAdd({
  addTrucks
});
const trucksSelects = truckSelect({
  selectTrucks
});

const trucksUpdates = trucksUpdate({
  updateTrucks
});
const trucksDeletes = truckDelete({
  deleteTrucks
});
// #########
const services = Object.freeze({
  truckAdds,
  trucksSelects,
  trucksUpdates,
  trucksDeletes,
});

module.exports = services;
module.exports = {
  truckAdds,
  trucksSelects,
  trucksUpdates,
  trucksDeletes,
};