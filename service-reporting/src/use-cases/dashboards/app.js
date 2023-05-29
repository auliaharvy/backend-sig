
  const dashboardDb = require("../../data-access/dashboards/app"); // database queries
  const { encrypt, decrypt } = require("../../functions/app");
  // #########
  const selectTotalPallet = require("./select-total-pallet");
  const selectPalletCondition = require("./select-pallet-condition");
  const selectDetailPallet = require("./select-detail-pallet");
  // #########
  const selectTotalPallets = selectTotalPallet({ dashboardDb });
  const selectPalletConditions = selectPalletCondition({ dashboardDb });
  const selectDetailPallets = selectDetailPallet({ dashboardDb });
  // #########
  const services = Object.freeze({
    selectTotalPallets,
    selectPalletConditions,
    selectDetailPallets
  });
  
  module.exports = services;
  module.exports = {
    selectTotalPallets,
    selectPalletConditions,
    selectDetailPallets
  };