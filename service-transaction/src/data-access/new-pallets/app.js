const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const newPalletDb = query({ connects, models });
// ######

module.exports = newPalletDb;