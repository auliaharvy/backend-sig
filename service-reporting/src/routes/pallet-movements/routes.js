const {
    palletMovementsSelects,
  } = require("../../controller/pallet-movements/app");
  
  const route = ({ router, makeExpressCallback, validateAuth }) => {
    // #####
    // GET
    router.get("/", makeExpressCallback(palletMovementsSelects));
  
    return router;
  };
  
  module.exports = route;