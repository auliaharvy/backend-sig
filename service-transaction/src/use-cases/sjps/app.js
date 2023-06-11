const { makeSjps, patchSjps } = require("../../entities/sjps/app"); // entity
const sjpDb = require("../../data-access/sjps/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const CHANGE_DESTINATION_TEMPLATE = require("../../lib/mail-template/sjp-change-destination");
const CHANGE_TRUCK_TEMPLATE = require("../../lib/mail-template/sjp-change-truck");
const addSjp = require("./insert-sjp");
const selectSjp = require("./select-sjp");
const updateSjp = require("./update-sjp");
const deleteSjp = require("./delete-sjp");
// #########
const addSjps = addSjp({ makeSjps, sjpDb, trxNumbersDb, allTransactionDb });
const selectSjps = selectSjp({ sjpDb });
const updateSjps = updateSjp({ sjpDb, trxNumbersDb, patchSjps, allTransactionDb, SENDMAIL,  CHANGE_DESTINATION_TEMPLATE, CHANGE_TRUCK_TEMPLATE});
const deleteSjps = deleteSjp({ sjpDb });
// #########
const services = Object.freeze({
  selectSjps,
  selectSjps,
  updateSjps,
  deleteSjps,
});

module.exports = services;
module.exports = {
  addSjps,
  selectSjps,
  updateSjps,
  deleteSjps,
};
