const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const sjpStatusDb = query({ connects, models });
// ######

module.exports = sjpStatusDb;