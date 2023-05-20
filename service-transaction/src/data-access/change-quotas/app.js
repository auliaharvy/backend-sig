const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const changeQuotaDb = query({ connects, models });
// ######

module.exports = changeQuotaDb;