const {
    selectTotalPallets,
    selectTotalPalletPlants,
    selectPalletConditions,
    selectDetailPallets,
    selectPalletSendReceives,
  } = require("../../use-cases/dashboards/app");
  // #########
  const totalPalletsSelect = require("./select-total-pallet");
  const totalPalletPlantsSelect = require("./select-total-pallet-plant");
  const detailPalletsSelect = require("./select-detail-pallet");
  const palletConditionsSelect = require("./select-pallet-condition");
  const palletSendReceivesSelect = require("./select-pallet-send-receive");
  // #########
  const totalPalletsSelects = totalPalletsSelect({ selectTotalPallets });
  const totalPalletPlantsSelects = totalPalletPlantsSelect({ selectTotalPalletPlants });
  const detailPalletsSelects = detailPalletsSelect({ selectDetailPallets });
  const palletConditionsSelects = palletConditionsSelect({ selectPalletConditions });
  const palletSendReceivesSelects = palletSendReceivesSelect({ selectPalletSendReceives });
  // #########
  const services = Object.freeze({
    totalPalletsSelects,
    totalPalletPlantsSelects,
    detailPalletsSelects,
    palletConditionsSelects,
    palletSendReceivesSelects
  });
  
  module.exports = services;
  module.exports = {
    totalPalletsSelects,
    totalPalletPlantsSelects,
    detailPalletsSelects,
    palletConditionsSelects,
    palletSendReceivesSelects
  };