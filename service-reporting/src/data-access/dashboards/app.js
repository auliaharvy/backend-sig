const { connects } = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const dashboardDb = query({ connects, models });
// ######

module.exports = dashboardDb;