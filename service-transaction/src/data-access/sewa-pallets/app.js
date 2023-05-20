const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const sewaPalletDb = query({ connects, models });
// ######

module.exports = sewaPalletDb;