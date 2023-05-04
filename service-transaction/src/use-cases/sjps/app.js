const { makeSjps, patchSjps } = require("../../entities/sjps/app"); // entity
const sjpDb = require("../../data-access/sjps/app"); // database queries
const trxNumbersDb = require("../../data-access/trx-numbers/app"); // database queries
const { encrypt, decrypt } = require("../../functions/app");
// #########
const addSjp = require("./insert-sjp");
const selectSjp = require("./select-sjp");
const updateSjp = require("./update-sjp");
const deleteSjp = require("./delete-sjp");
// #########
const addSjps = addSjp({ makeSjps, sjpDb, trxNumbersDb });
const selectSjps = selectSjp({ sjpDb });
const updateSjps = updateSjp({ sjpDb, patchSjps });
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
