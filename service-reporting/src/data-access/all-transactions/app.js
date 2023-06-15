const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const allTransactionsDb = query({ connects, models });
// ######

module.exports = allTransactionsDb;