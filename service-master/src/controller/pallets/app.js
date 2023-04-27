const {
  addPallets,
  selectPallets,
  updatePallets,
  deletePallets,
} = require("../../use-cases/pallets/app");
// #########
const palletAdd = require("./insert-pallet");
const palletsSelect = require("./select-pallet");
const palletsUpdate = require("./update-pallet");
const palletsDelete = require("./delete-pallet");
// #########
const palletAdds = palletAdd({
  addPallets
});
const palletsSelects = palletsSelect({
  selectPallets
});

const palletsUpdates = palletsUpdate({
  updatePallets
});
const palletsDeletes = palletsDelete({
  deletePallets
});
// #########
const services = Object.freeze({
  palletAdds,
  palletsSelects,
  palletsUpdates,
  palletsDeletes,
});

module.exports = services;
module.exports = {
  palletAdds,
  palletsSelects,
  palletsUpdates,
  palletsDeletes,
};