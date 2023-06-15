const {
    allTransactionsSelects,
  } = require("../../controller/all-transactions/app");
  
  const route = ({ router, makeExpressCallback, validateAuth }) => {
    // #####
    // GET
    router.get("/", makeExpressCallback(allTransactionsSelects));
  
    return router;
  };
  
  module.exports = route;