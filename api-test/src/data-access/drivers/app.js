const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const DriversDb = query({
    connects,
    models
});
// ######

module.exports = DriversDb;