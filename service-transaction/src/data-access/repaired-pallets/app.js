const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const repairedPalletDb = query({ connects, models });
// ######

module.exports = repairedPalletDb;