const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const allTransactionDb = query({ connects, models });
// ######

module.exports = allTransactionDb;