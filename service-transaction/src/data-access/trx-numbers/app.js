const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const trxNumbersDb = query({ connects, models });
// ######

module.exports = trxNumbersDb;