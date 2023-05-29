const {
    selectTotalPallets,
    selectPalletConditions,
    selectDetailPallets,
  } = require("../../use-cases/dashboards/app");
  // #########
  const totalPalletsSelect = require("./select-total-pallet");
  const detailPalletsSelect = require("./select-detail-pallet");
  const palletConditionsSelect = require("./select-pallet-condition");
  // #########
  const totalPalletsSelects = totalPalletsSelect({ selectTotalPallets });
  const detailPalletsSelects = detailPalletsSelect({ selectDetailPallets });
  const palletConditionsSelects = palletConditionsSelect({ selectPalletConditions });
  // #########
  const services = Object.freeze({
    totalPalletsSelects,
    detailPalletsSelects,
    palletConditionsSelects,
  });
  
  module.exports = services;
  module.exports = {
    totalPalletsSelects,
    detailPalletsSelects,
    palletConditionsSelects
  };