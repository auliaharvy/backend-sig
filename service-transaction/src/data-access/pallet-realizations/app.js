const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const palletRealizationDb = query({ connects, models });
// ######

module.exports = palletRealizationDb;