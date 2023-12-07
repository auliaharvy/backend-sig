const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const damagedPalletDb = query({ connects, models });
// ######

module.exports = damagedPalletDb;