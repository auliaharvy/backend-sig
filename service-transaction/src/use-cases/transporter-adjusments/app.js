const { makeTransporterAdjusments, patchTransporterAdjusments } = require("../../entities/transporter-adjusments/app"); // entity
const transporterAdjusmentDb = require("../../data-access/transporter-adjusments/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addTransporterAdjusment = require("./insert-transporter-adjusments");
const selectTransporterAdjusment = require("./select-transporter-adjusments");
const updateTransporterAdjusment = require("./update-transporter-adjusments");
const deleteTransporterAdjusment = require("./delete-transporter-adjusments");
// #########
const addTransporterAdjusments = addTransporterAdjusment({ makeTransporterAdjusments, allTransactionDb, transporterAdjusmentDb, trxNumbersDb });
const selectTransporterAdjusments = selectTransporterAdjusment({ transporterAdjusmentDb });
const updateTransporterAdjusments = updateTransporterAdjusment({ transporterAdjusmentDb, patchTransporterAdjusments });
const deleteTransporterAdjusments = deleteTransporterAdjusment({ transporterAdjusmentDb });
// #########
const services = Object.freeze({
  addTransporterAdjusments,
  selectTransporterAdjusments,
  updateTransporterAdjusments,
  deleteTransporterAdjusments,
});

module.exports = services;
module.exports = {
  addTransporterAdjusments,
  selectTransporterAdjusments,
  updateTransporterAdjusments,
  deleteTransporterAdjusments,
};
