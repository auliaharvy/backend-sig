
  const palletMovementsDb = require("../../data-access/pallet-movements/app"); // database queries
  const { encrypt, decrypt } = require("../../functions/app");
  // #########
  const selectPalletMovement = require("./select-pallet-movements");
  // #########
  const selectPalletMovements = selectPalletMovement({ palletMovementsDb });
  // #########
  const services = Object.freeze({
    selectPalletMovements,
  });
  
  module.exports = services;
  module.exports = {
    selectPalletMovements,
  };