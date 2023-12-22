const {
  totalPalletsSelects,
  totalPalletPlantsSelects,
  palletConditionsSelects,
  detailPalletsSelects,
  palletSendReceivesSelects,
  } = require("../../controller/dashboards/app");
  
  const route = ({ router, makeExpressCallback, validateAuth }) => {
    // #####
    // GET
    router.get("/total-pallet", makeExpressCallback(totalPalletsSelects));
    router.get("/total-pallet-plant", makeExpressCallback(totalPalletPlantsSelects));
    router.get("/pallet-condition", makeExpressCallback(palletConditionsSelects));
    router.get("/pallet-condition-company", makeExpressCallback(palletConditionsSelects));
    router.get("/detail-pallet", makeExpressCallback(detailPalletsSelects));
    router.get("/pallet-send-receive", makeExpressCallback(palletSendReceivesSelects));
  
    return router;
  };
  
  module.exports = route;