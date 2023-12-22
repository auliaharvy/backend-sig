
  const dashboardDb = require("../../data-access/dashboards/app"); // database queries
  const { encrypt, decrypt } = require("../../functions/app");
  // #########
  const selectTotalPallet = require("./select-total-pallet");
  const selectTotalPalletPlant = require("./select-total-pallet-plant");
  const selectPalletCondition = require("./select-pallet-condition");
  const selectDetailPallet = require("./select-detail-pallet");
  const selectPalletSendReceive = require("./select-pallet-send-receive");
  // #########
  const selectTotalPallets = selectTotalPallet({ dashboardDb });
  const selectTotalPalletPlants = selectTotalPalletPlant({ dashboardDb });
  const selectPalletConditions = selectPalletCondition({ dashboardDb });
  const selectDetailPallets = selectDetailPallet({ dashboardDb });
  const selectPalletSendReceives = selectPalletSendReceive({ dashboardDb });
  // #########
  const services = Object.freeze({
    selectTotalPallets,
    selectTotalPalletPlants,
    selectPalletConditions,
    selectDetailPallets,
    selectPalletSendReceives
  });
  
  module.exports = services;
  module.exports = {
    selectTotalPallets,
    selectTotalPalletPlants,
    selectPalletConditions,
    selectDetailPallets,
    selectPalletSendReceives
  };