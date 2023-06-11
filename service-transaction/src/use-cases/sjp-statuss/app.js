const { makeSjpStatuss, patchSjpStatuss } = require("../../entities/sjp-statuss/app"); // entity
const sjpStatusDb = require("../../data-access/sjp-statuss/app"); // database queries
const sjpDb = require("../../data-access/sjps/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const SJP_TEMPLATE = require("../../lib/mail-template/sjp-send");
const addSjpStatus = require("./insert-sjp-status");
const selectSjpStatus = require("./select-sjp-status");
const updateSjpStatus = require("./update-sjp-status");
const deleteSjpStatus = require("./delete-sjp-status");
// #########
const addSjpStatuss = addSjpStatus({ makeSjpStatuss, sjpStatusDb, allTransactionDb,sjpDb,trxNumbersDb, SENDMAIL, SJP_TEMPLATE });
const selectSjpStatuss = selectSjpStatus({ sjpStatusDb });
const updateSjpStatuss = updateSjpStatus({ sjpStatusDb, patchSjpStatuss, allTransactionDb, trxNumbersDb});
const deleteSjpStatuss = deleteSjpStatus({ sjpStatusDb });
// #########
const services = Object.freeze({
  addSjpStatuss,
  selectSjpStatuss,
  updateSjpStatuss,
  deleteSjpStatuss,
});

module.exports = services;
module.exports = {
  addSjpStatuss,
  selectSjpStatuss,
  updateSjpStatuss,
  deleteSjpStatuss,
};
