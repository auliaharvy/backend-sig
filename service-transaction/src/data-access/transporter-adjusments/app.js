const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const transporterAdjusmentDb = query({ connects, models });
// ######

module.exports = transporterAdjusmentDb;