const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const palletMovementDb = query({ connects, models });
// ######

module.exports = palletMovementDb;