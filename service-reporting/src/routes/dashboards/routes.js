const {
  totalPalletsSelects,
  palletConditionsSelects,
  detailPalletsSelects
  } = require("../../controller/dashboards/app");
  
  const route = ({ router, makeExpressCallback, validateAuth }) => {
    // #####
    // GET
    router.get("/total-pallet", makeExpressCallback(totalPalletsSelects));
    router.get("/pallet-condition", makeExpressCallback(palletConditionsSelects));
    router.get("/detail-pallet", makeExpressCallback(detailPalletsSelects));
  
    return router;
  };
  
  module.exports = route;