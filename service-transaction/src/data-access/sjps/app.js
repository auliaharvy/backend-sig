const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const sjpDb = query({ connects, models });
// ######

module.exports = sjpDb;