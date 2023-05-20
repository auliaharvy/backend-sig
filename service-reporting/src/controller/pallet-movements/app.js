const {
    selectPalletMovements,
  } = require("../../use-cases/pallet-movements/app");
  // #########
  const palletMovementsSelect = require("./select-pallet-movements");
  // #########
  const palletMovementsSelects = palletMovementsSelect({ selectPalletMovements });
  // #########
  const services = Object.freeze({
    palletMovementsSelects,
  });
  
  module.exports = services;
  module.exports = {
    palletMovementsSelects,
  };