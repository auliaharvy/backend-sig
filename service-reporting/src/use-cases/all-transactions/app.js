
  const allTransactionsDb = require("../../data-access/all-transactions/app"); // database queries
  const { encrypt, decrypt } = require("../../functions/app");
  // #########
  const selectAllTransaction = require("./select-all-transactions");
  // #########
  const selectAllTransactions = selectAllTransaction({ allTransactionsDb });
  // #########
  const services = Object.freeze({
    selectAllTransactions,
  });
  
  module.exports = services;
  module.exports = {
    selectAllTransactions,
  };