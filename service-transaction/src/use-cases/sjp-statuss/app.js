const { makeSjpStatuss, patchSjpStatuss } = require("../../entities/sjp-statuss/app"); // entity
const sjpStatusDb = require("../../data-access/sjp-statuss/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addSjpStatus = require("./insert-sjp-status");
const selectSjpStatus = require("./select-sjp-status");
const updateSjpStatus = require("./update-sjp-status");
const deleteSjpStatus = require("./delete-sjp-status");
// #########
const addSjpStatuss = addSjpStatus({ makeSjpStatuss, sjpStatusDb, trxNumbersDb });
const selectSjpStatuss = selectSjpStatus({ sjpStatusDb });
const updateSjpStatuss = updateSjpStatus({ sjpStatusDb, patchSjpStatuss });
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
