const {
    selectAllTransactions,
  } = require("../../use-cases/all-transactions/app");
  // #########
  const allTransactionsSelect = require("./select-all-transactions");
  // #########
  const allTransactionsSelects = allTransactionsSelect({ selectAllTransactions });
  // #########
  const services = Object.freeze({
    allTransactionsSelects,
  });
  
  module.exports = services;
  module.exports = {
    allTransactionsSelects,
  };