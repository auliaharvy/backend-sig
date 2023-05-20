const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const claimPalletDb = query({ connects, models });
// ######

module.exports = claimPalletDb;