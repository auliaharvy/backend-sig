const {
    selectTotalPallets,
    selectPalletConditions,
    selectDetailPallets,
    selectPalletSendReceives,
  } = require("../../use-cases/dashboards/app");
  // #########
  const totalPalletsSelect = require("./select-total-pallet");
  const detailPalletsSelect = require("./select-detail-pallet");
  const palletConditionsSelect = require("./select-pallet-condition");
  const palletSendReceivesSelect = require("./select-pallet-send-receive");
  // #########
  const totalPalletsSelects = totalPalletsSelect({ selectTotalPallets });
  const detailPalletsSelects = detailPalletsSelect({ selectDetailPallets });
  const palletConditionsSelects = palletConditionsSelect({ selectPalletConditions });
  const palletSendReceivesSelects = palletSendReceivesSelect({ selectPalletSendReceives });
  // #########
  const services = Object.freeze({
    totalPalletsSelects,
    detailPalletsSelects,
    palletConditionsSelects,
    palletSendReceivesSelects
  });
  
  module.exports = services;
  module.exports = {
    totalPalletsSelects,
    detailPalletsSelects,
    palletConditionsSelects,
    palletSendReceivesSelects
  };