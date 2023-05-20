const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const palletTransfersDb = query({ connects, models });
// ######

module.exports = palletTransfersDb;