const { makeChangeQuotas, patchChangeQuotas } = require("../../entities/change-quotas/app"); // entity
const changeQuotaDb = require("../../data-access/change-quotas/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const allTransactionDb = require("../../data-access/all-transactions/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const SENDMAIL = require("../../lib/mailer");
const CHANGE_QUOTA_TEMPLATE = require("../../lib/mail-template/change-quota-request");
const CHANGE_QUOTA_APPROVAL_TEMPLATE = require("../../lib/mail-template/change-quota-approval");
const addChangeQuota = require("./insert-change-quotas");
const selectChangeQuota = require("./select-change-quotas");
const updateChangeQuota = require("./update-change-quotas");
const deleteChangeQuota = require("./delete-change-quotas");
// #########
const addChangeQuotas = addChangeQuota({ makeChangeQuotas, changeQuotaDb, allTransactionDb, trxNumbersDb, SENDMAIL, CHANGE_QUOTA_TEMPLATE});
const selectChangeQuotas = selectChangeQuota({ changeQuotaDb });
const updateChangeQuotas = updateChangeQuota({ changeQuotaDb, patchChangeQuotas, trxNumbersDb, allTransactionDb, SENDMAIL, CHANGE_QUOTA_APPROVAL_TEMPLATE});
const deleteChangeQuotas = deleteChangeQuota({ changeQuotaDb });
// #########
const services = Object.freeze({
  addChangeQuotas,
  selectChangeQuotas,
  updateChangeQuotas,
  deleteChangeQuotas,
});

module.exports = services;
module.exports = {
  addChangeQuotas,
  selectChangeQuotas,
  updateChangeQuotas,
  deleteChangeQuotas,
};
